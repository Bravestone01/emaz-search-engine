import { isAmazonProductUrl, addAffiliateTag } from '@/lib/affiliate/urlRewriter'

describe('urlRewriter', () => {
  describe('isAmazonProductUrl', () => {
    it('should detect amazon.com/dp/ URLs', () => {
      expect(isAmazonProductUrl('https://www.amazon.com/dp/B08N5WRWNW')).toBe(true)
      expect(isAmazonProductUrl('https://amazon.com/dp/B08N5WRWNW')).toBe(true)
    })

    it('should detect amazon.com/gp/product URLs', () => {
      expect(isAmazonProductUrl('https://www.amazon.com/gp/product/B08N5WRWNW')).toBe(true)
      expect(isAmazonProductUrl('https://amazon.com/gp/product/B08N5WRWNW')).toBe(true)
    })

    it('should detect amazon.com/gp/aw/d URLs', () => {
      expect(isAmazonProductUrl('https://www.amazon.com/gp/aw/d/B08N5WRWNW')).toBe(true)
      expect(isAmazonProductUrl('https://amazon.com/gp/aw/d/B08N5WRWNW')).toBe(true)
    })

    it('should detect amazon.co.uk URLs', () => {
      expect(isAmazonProductUrl('https://www.amazon.co.uk/dp/B08N5WRWNW')).toBe(true)
      expect(isAmazonProductUrl('https://amazon.co.uk/gp/product/B08N5WRWNW')).toBe(true)
    })

    it('should detect amazon.ca URLs', () => {
      expect(isAmazonProductUrl('https://www.amazon.ca/dp/B08N5WRWNW')).toBe(true)
      expect(isAmazonProductUrl('https://amazon.ca/gp/product/B08N5WRWNW')).toBe(true)
    })

    it('should not detect non-Amazon URLs', () => {
      expect(isAmazonProductUrl('https://www.google.com')).toBe(false)
      expect(isAmazonProductUrl('https://www.ebay.com/itm/123456')).toBe(false)
      expect(isAmazonProductUrl('https://example.com/dp/123')).toBe(false)
    })

    it('should not detect Amazon URLs without product patterns', () => {
      expect(isAmazonProductUrl('https://www.amazon.com')).toBe(false)
      expect(isAmazonProductUrl('https://www.amazon.com/deals')).toBe(false)
      expect(isAmazonProductUrl('https://www.amazon.com/s?k=laptop')).toBe(false)
    })

    it('should handle URLs with query parameters', () => {
      expect(
        isAmazonProductUrl('https://www.amazon.com/dp/B08N5WRWNW?ref=test&tag=existing')
      ).toBe(true)
    })

    it('should handle URLs with fragments', () => {
      expect(isAmazonProductUrl('https://www.amazon.com/dp/B08N5WRWNW#reviews')).toBe(true)
    })
  })

  describe('addAffiliateTag', () => {
    it('should add US affiliate tag to amazon.com URLs', () => {
      const result = addAffiliateTag('https://www.amazon.com/dp/B08N5WRWNW')
      expect(result).toContain('tag=emazhalal-20')
      expect(result).toContain('amazon.com')
    })

    it('should add UK affiliate tag to amazon.co.uk URLs', () => {
      const result = addAffiliateTag('https://www.amazon.co.uk/dp/B08N5WRWNW')
      expect(result).toContain('tag=emazhalal-21')
      expect(result).toContain('amazon.co.uk')
    })

    it('should add CA affiliate tag to amazon.ca URLs', () => {
      const result = addAffiliateTag('https://www.amazon.ca/dp/B08N5WRWNW')
      expect(result).toContain('tag=emazhalal-22')
      expect(result).toContain('amazon.ca')
    })

    it('should preserve existing query parameters', () => {
      const result = addAffiliateTag('https://www.amazon.com/dp/B08N5WRWNW?ref=test')
      expect(result).toContain('ref=test')
      expect(result).toContain('tag=emazhalal-20')
    })

    it('should replace existing tag parameter', () => {
      const result = addAffiliateTag('https://www.amazon.com/dp/B08N5WRWNW?tag=old-tag')
      expect(result).not.toContain('tag=old-tag')
      expect(result).toContain('tag=emazhalal-20')
    })

    it('should handle URLs without query parameters', () => {
      const result = addAffiliateTag('https://www.amazon.com/dp/B08N5WRWNW')
      expect(result).toMatch(/\?tag=emazhalal-20/)
    })

    it('should preserve URL fragments', () => {
      const result = addAffiliateTag('https://www.amazon.com/dp/B08N5WRWNW#reviews')
      expect(result).toContain('#reviews')
      expect(result).toContain('tag=emazhalal-20')
    })

    it('should handle gp/product URLs', () => {
      const result = addAffiliateTag('https://www.amazon.com/gp/product/B08N5WRWNW')
      expect(result).toContain('tag=emazhalal-20')
    })

    it('should handle gp/aw/d URLs', () => {
      const result = addAffiliateTag('https://www.amazon.com/gp/aw/d/B08N5WRWNW')
      expect(result).toContain('tag=emazhalal-20')
    })

    it('should return unchanged URL for unknown Amazon domains', () => {
      const result = addAffiliateTag('https://www.amazon.de/dp/B08N5WRWNW')
      // amazon.de is not in config, so it returns unchanged
      expect(result).toBe('https://www.amazon.de/dp/B08N5WRWNW')
    })
  })
})
