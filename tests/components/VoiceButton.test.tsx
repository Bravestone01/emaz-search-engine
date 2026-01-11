import { render, screen, fireEvent } from '../utils/testUtils'
import VoiceButton from '@/components/core/VoiceButton'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('VoiceButton', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('should render voice button', () => {
    render(<VoiceButton />)
    const button = screen.getByRole('button', { name: /voice search/i })
    expect(button).toBeInTheDocument()
  })

  it('should have correct aria attributes', () => {
    render(<VoiceButton />)
    const button = screen.getByRole('button', { name: /voice search/i })

    expect(button).toHaveAttribute('aria-label', 'Voice search')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('should show unavailable message if no SpeechRecognition support', () => {
    // Mock no support
    const originalWindow = global.window
    delete (global.window as any).SpeechRecognition
    delete (global.window as any).webkitSpeechRecognition

    render(<VoiceButton />)
    const button = screen.getByRole('button', { name: /voice search/i })

    fireEvent.click(button)

    expect(screen.getByText(/unavailable/i)).toBeInTheDocument()
    expect(button).toBeDisabled()

    global.window = originalWindow
  })

  it('should update aria-pressed when listening', () => {
    // Mock SpeechRecognition
    const mockRecognition = {
      start: jest.fn(),
      abort: jest.fn(),
      onresult: null,
      onerror: null,
      onend: null,
    }

    ;(global.window as any).SpeechRecognition = jest.fn(() => mockRecognition)

    render(<VoiceButton />)
    const button = screen.getByRole('button', { name: /voice search/i })

    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/listening/i)).toBeInTheDocument()
  })

  it('should abort recognition on second click', () => {
    const mockRecognition = {
      start: jest.fn(),
      abort: jest.fn(),
      onresult: null,
      onerror: null,
      onend: null,
    }

    ;(global.window as any).SpeechRecognition = jest.fn(() => mockRecognition)

    render(<VoiceButton />)
    const button = screen.getByRole('button', { name: /voice search/i })

    // First click - start listening
    fireEvent.click(button)
    expect(mockRecognition.start).toHaveBeenCalledTimes(1)

    // Second click - abort
    fireEvent.click(button)
    expect(mockRecognition.abort).toHaveBeenCalledTimes(1)
  })

  it('should cleanup on unmount', () => {
    const mockRecognition = {
      start: jest.fn(),
      abort: jest.fn(),
      onresult: null,
      onerror: null,
      onend: null,
    }

    ;(global.window as any).SpeechRecognition = jest.fn(() => mockRecognition)

    const { unmount } = render(<VoiceButton />)
    const button = screen.getByRole('button', { name: /voice search/i })

    fireEvent.click(button)
    unmount()

    expect(mockRecognition.abort).toHaveBeenCalled()
  })

  it('should detect and use Urdu language when browser language is Urdu', () => {
    const mockRecognition = {
      start: jest.fn(),
      abort: jest.fn(),
      lang: '',
      onresult: null,
      onerror: null,
      onend: null,
    }

    ;(global.window as any).SpeechRecognition = jest.fn(() => mockRecognition)

    // Mock Urdu browser language
    Object.defineProperty(navigator, 'language', {
      value: 'ur-PK',
      configurable: true,
    })

    render(<VoiceButton />)
    const button = screen.getByRole('button', { name: /voice search/i })

    fireEvent.click(button)

    expect(mockRecognition.lang).toBe('ur-PK')
  })

  it('should use English language by default', () => {
    const mockRecognition = {
      start: jest.fn(),
      abort: jest.fn(),
      lang: '',
      onresult: null,
      onerror: null,
      onend: null,
    }

    ;(global.window as any).SpeechRecognition = jest.fn(() => mockRecognition)

    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      configurable: true,
    })

    render(<VoiceButton />)
    const button = screen.getByRole('button', { name: /voice search/i })

    fireEvent.click(button)

    expect(mockRecognition.lang).toBe('en-US')
  })
})
