import { render, screen } from '../utils/testUtils'
import Pagination from '@/components/results/Pagination'

describe('Pagination', () => {
  it('should render page numbers', () => {
    render(<Pagination currentPage={1} query="test" />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should render Previous and Next buttons', () => {
    render(<Pagination currentPage={1} query="test" />)

    expect(screen.getByText(/previous/i)).toBeInTheDocument()
    expect(screen.getByText(/next/i)).toBeInTheDocument()
  })

  it('should disable Previous on page 1', () => {
    render(<Pagination currentPage={1} query="test" />)

    const prevButton = screen.getByText(/previous/i)

    expect(prevButton).toHaveClass('pointer-events-none')
    expect(prevButton).toHaveClass('opacity-30')
  })

  it('should disable Next on last page', () => {
    render(<Pagination currentPage={3} query="test" />)

    const nextButton = screen.getByText(/next/i)

    expect(nextButton).toHaveClass('pointer-events-none')
    expect(nextButton).toHaveClass('opacity-30')
  })

  it('should not disable Previous on page 2', () => {
    render(<Pagination currentPage={2} query="test" />)

    const prevButton = screen.getByText(/previous/i)

    expect(prevButton).not.toHaveClass('pointer-events-none')
  })

  it('should not disable Next on page 2', () => {
    render(<Pagination currentPage={2} query="test" />)

    const nextButton = screen.getByText(/next/i)

    expect(nextButton).not.toHaveClass('pointer-events-none')
  })

  it('should highlight current page', () => {
    render(<Pagination currentPage={2} query="test" />)

    const currentPageLink = screen.getByText('2').closest('a')

    expect(currentPageLink).toHaveClass('bg-gradient-to-br')
    expect(currentPageLink).toHaveClass('from-[#FFD700]')
  })

  it('should preserve query params in links', () => {
    render(<Pagination currentPage={1} query="test search" />)

    const page2Link = screen.getByText('2').closest('a')

    expect(page2Link).toHaveAttribute('href', '/results?q=test+search&page=2')
  })

  it('should generate correct href for Previous button', () => {
    render(<Pagination currentPage={2} query="test" />)

    const prevButton = screen.getByText(/previous/i)

    expect(prevButton).toHaveAttribute('href', '/results?q=test&page=1')
  })

  it('should generate correct href for Next button', () => {
    render(<Pagination currentPage={1} query="test" />)

    const nextButton = screen.getByText(/next/i)

    expect(nextButton).toHaveAttribute('href', '/results?q=test&page=2')
  })

  it('should handle empty query', () => {
    render(<Pagination currentPage={1} query="" />)

    const page2Link = screen.getByText('2').closest('a')

    expect(page2Link).toHaveAttribute('href', '/results?page=2')
  })

  it('should have correct aria-disabled attributes', () => {
    render(<Pagination currentPage={1} query="test" />)

    const prevButton = screen.getByText(/previous/i)
    const nextButton = screen.getByText(/next/i)

    expect(prevButton).toHaveAttribute('aria-disabled', 'true')
    expect(nextButton).toHaveAttribute('aria-disabled', 'false')
  })
})
