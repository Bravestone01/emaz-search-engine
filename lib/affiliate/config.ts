export type AmazonCountrySetting = {
  country: string
  domain: string
  affiliateTag: string
}

type AffiliateConfig = {
  amazonAffiliateId: string
  productCategories: string[]
  countrySettings: AmazonCountrySetting[]
}

export const affiliateConfig: AffiliateConfig = {
  amazonAffiliateId: 'emazhalal-20',
  productCategories: ['books', 'electronics', 'home', 'fashion', 'health', 'beauty'],
  countrySettings: [
    { country: 'United States', domain: 'amazon.com', affiliateTag: 'emazhalal-20' },
    { country: 'United Kingdom', domain: 'amazon.co.uk', affiliateTag: 'emazhalal-21' },
    { country: 'Canada', domain: 'amazon.ca', affiliateTag: 'emazhalal-22' },
  ],
}
