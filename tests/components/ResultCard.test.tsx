import { render, screen, fireEvent } from '../utils/testUtils'
import ResultCard from '@/components/results/ResultCard'

// Mock affiliate functions
jest.mock('@/lib/affiliate/earningsTracker', () => ({
  trackAffiliateClick: jest.fn(),
}))

jest.mock('@/lib/affiliate/urlRewriter', () => ({
  isAmazonProductUrl: jest.fn(),
  addAffiliateTag: jest.fn((url) => url + '?tag=test'),
}))

describe('ResultCard', () => {
  const defaultProps = {
    title: 'Test Result',
    description: 'Test description',
    source: 'Wikipedia',
    url: 'https://example.com/test',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render result data', () => {
    const { isAmazonProductUrl } = require('@/lib/affiliate/urlRewriter')
    isAmazonProductUrl.mockReturnValue(false)

    render(<ResultCard {...defaultProps} />)

    expect(screen.getByText('Test Result')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Wikipedia')).toBeInTheDocument()
  })

  it('should detect Amazon URLs', () => {
    const { isAmazonProductUrl, addAffiliateTag } = require('@/lib/affiliate/urlRewriter')
    isAmazonProductUrl.mockReturnValue(true)
    addAffiliateTag.mockReturnValue('https://amazon.com/dp/123?tag=test')

    render(<ResultCard {...defaultProps} url="https://amazon.com/dp/123" />)

    expect(isAmazonProductUrl).toHaveBeenCalledWith('https://amazon.com/dp/123')
    expect(addAffiliateTag).toHaveBeenCalledWith('https://amazon.com/dp/123')
  })

  it('should show "Halal Earnings" badge for affiliate links', () => {
    const { isAmazonProductUrl } = require('@/lib/affiliate/urlRewriter')
    isAmazonProductUrl.mockReturnValue(true)

    render(<ResultCard {...defaultProps} url="https://amazon.com/dp/123" />)

    expect(screen.getByText(/halal earnings/i)).toBeInTheDocument()
  })

  it('should not show "Halal Earnings" badge for non-affiliate links', () => {
    const { isAmazonProductUrl } = require('@/lib/affiliate/urlRewriter')
    isAmazonProductUrl.mockReturnValue(false)

    render(<ResultCard {...defaultProps} />)

    expect(screen.queryByText(/halal earnings/i)).not.toBeInTheDocument()
  })

  it('should track affiliate clicks', () => {
    const { isAmazonProductUrl, addAffiliateTag } = require('@/lib/affiliate/urlRewriter')
    const { trackAffiliateClick } = require('@/lib/affiliate/earningsTracker')

    isAmazonProductUrl.mockReturnValue(true)
    const affiliateUrl = 'https://amazon.com/dp/123?tag=test'
    addAffiliateTag.mockReturnValue(affiliateUrl)

    render(<ResultCard {...defaultProps} url="https://amazon.com/dp/123" />)

    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(trackAffiliateClick).toHaveBeenCalledWith(affiliateUrl)
  })

  it('should not track non-affiliate clicks', () => {
    const { isAmazonProductUrl } = require('@/lib/affiliate/urlRewriter')
    const { trackAffiliateClick } = require('@/lib/affiliate/earningsTracker')

    isAmazonProductUrl.mockReturnValue(false)

    render(<ResultCard {...defaultProps} />)

    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(trackAffiliateClick).not.toHaveBeenCalled()
  })

  it('should open link in new tab', () => {
    const { isAmazonProductUrl } = require('@/lib/affiliate/urlRewriter')
    isAmazonProductUrl.mockReturnValue(false)

    render(<ResultCard {...defaultProps} />)

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('should display hostname from URL', () => {
    const { isAmazonProductUrl } = require('@/lib/affiliate/urlRewriter')
    isAmazonProductUrl.mockReturnValue(false)

    render(<ResultCard {...defaultProps} url="https://example.com/test/path" />)

    expect(screen.getByText('example.com')).toBeInTheDocument()
  })

  it('should use affiliate URL in href', () => {
    const { isAmazonProductUrl, addAffiliateTag } = require('@/lib/affiliate/urlRewriter')
    isAmazonProductUrl.mockReturnValue(true)
    const affiliateUrl = 'https://amazon.com/dp/123?tag=emaz-20'
    addAffiliateTag.mockReturnValue(affiliateUrl)

    render(<ResultCard {...defaultProps} url="https://amazon.com/dp/123" />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', affiliateUrl)
  })
})
