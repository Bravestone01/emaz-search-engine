const STORAGE_KEY = 'halalAffiliateClickCount'

export function trackAffiliateClick(url: string): void {
  if (typeof window === 'undefined') {
    return
  }

  const rawCount = window.localStorage.getItem(STORAGE_KEY)
  const currentCount = rawCount ? Number.parseInt(rawCount, 10) : 0
  const nextCount = Number.isNaN(currentCount) ? 1 : currentCount + 1

  window.localStorage.setItem(STORAGE_KEY, nextCount.toString())
  console.info(`[Affiliate] Total halal affiliate clicks: ${nextCount}`, { url })
}

export function getAffiliateClickCount(): number {
  if (typeof window === 'undefined') {
    return 0
  }

  const rawCount = window.localStorage.getItem(STORAGE_KEY)
  const currentCount = rawCount ? Number.parseInt(rawCount, 10) : 0

  return Number.isNaN(currentCount) ? 0 : currentCount
}
