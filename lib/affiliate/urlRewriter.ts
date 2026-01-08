import { affiliateConfig } from './config'

const amazonProductPathMatchers = [
  /\/dp\/[A-Z0-9]{8,}/i,
  /\/gp\/product\/[A-Z0-9]{8,}/i,
  /\/gp\/aw\/d\/[A-Z0-9]{8,}/i,
]

export function isAmazonProductUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    const matchingSetting = affiliateConfig.countrySettings.find((setting) =>
      parsedUrl.hostname.endsWith(setting.domain),
    )

    if (!matchingSetting) {
      return false
    }

    return amazonProductPathMatchers.some((matcher) => matcher.test(parsedUrl.pathname))
  } catch {
    return false
  }
}

export function addAffiliateTag(url: string): string {
  if (!isAmazonProductUrl(url)) {
    return url
  }

  try {
    const parsedUrl = new URL(url)
    const matchingSetting = affiliateConfig.countrySettings.find((setting) =>
      parsedUrl.hostname.endsWith(setting.domain),
    )
    const affiliateTag = matchingSetting?.affiliateTag ?? affiliateConfig.amazonAffiliateId

    parsedUrl.searchParams.set('tag', affiliateTag)

    return parsedUrl.toString()
  } catch {
    return url
  }
}
