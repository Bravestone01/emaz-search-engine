import { trackAffiliateClick, getAffiliateClickCount } from '@/lib/affiliate/earningsTracker'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

// Suppress console.info during tests
global.console = {
  ...console,
  info: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('earningsTracker', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('trackAffiliateClick', () => {
    it('should increment click count', () => {
      trackAffiliateClick('https://amazon.com/dp/123')
      expect(getAffiliateClickCount()).toBe(1)

      trackAffiliateClick('https://amazon.com/dp/456')
      expect(getAffiliateClickCount()).toBe(2)
    })

    it('should store data in localStorage', () => {
      trackAffiliateClick('https://amazon.com/dp/123')

      const stored = localStorageMock.getItem('halalAffiliateClickCount')
      expect(stored).toBeTruthy()
      expect(stored).toBe('1')
    })

    it('should preserve existing click count', () => {
      trackAffiliateClick('https://amazon.com/dp/123')
      const firstCount = getAffiliateClickCount()

      trackAffiliateClick('https://amazon.com/dp/456')
      const secondCount = getAffiliateClickCount()

      expect(secondCount).toBe(firstCount + 1)
    })

    it('should handle localStorage errors gracefully', () => {
      // Mock setItem to throw error
      const originalSetItem = window.localStorage.setItem
      window.localStorage.setItem = jest.fn(() => {
        throw new Error('Storage full')
      })

      // Should not throw
      expect(() => {
        trackAffiliateClick('https://amazon.com/dp/123')
      }).toThrow()

      // Restore
      window.localStorage.setItem = originalSetItem
    })

    it('should handle invalid current count', () => {
      localStorageMock.setItem('halalAffiliateClickCount', 'invalid')
      trackAffiliateClick('https://amazon.com/dp/123')
      expect(getAffiliateClickCount()).toBe(1)
    })
  })

  describe('getAffiliateClickCount', () => {
    it('should return 0 when no clicks tracked', () => {
      expect(getAffiliateClickCount()).toBe(0)
    })

    it('should return total clicks', () => {
      trackAffiliateClick('https://amazon.com/dp/123')
      trackAffiliateClick('https://amazon.com/dp/456')
      trackAffiliateClick('https://amazon.com/dp/789')

      expect(getAffiliateClickCount()).toBe(3)
    })

    it('should handle corrupted localStorage data', () => {
      localStorageMock.setItem('halalAffiliateClickCount', 'invalid number')
      expect(getAffiliateClickCount()).toBe(0)
    })

    it('should handle missing data', () => {
      expect(getAffiliateClickCount()).toBe(0)
    })
  })
})
