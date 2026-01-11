import { render, screen, fireEvent, waitFor } from '../utils/testUtils'
import SearchBar from '@/components/core/SearchBar'

// Mock router
const mockPush = jest.fn()

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock VoiceButton
jest.mock('@/components/core/VoiceButton', () => {
  return function MockVoiceButton() {
    return <div data-testid="voice-button">Voice Button</div>
  }
})

describe('SearchBar', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })
  it('should render search input', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(/search with halal intentions/i)
    expect(input).toBeInTheDocument()
  })

  it('should render voice button', () => {
    render(<SearchBar />)
    expect(screen.getByTestId('voice-button')).toBeInTheDocument()
  })

  it('should update query on input change', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(/search with halal intentions/i) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'test query' } })

    expect(input.value).toBe('test query')
  })

  it('should not submit empty query', () => {
    render(<SearchBar />)
    const form = screen.getByRole('button', { name: /search/i }).closest('form')

    fireEvent.submit(form!)

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should show loading state on submit', async () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(/search with halal intentions/i)
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.submit(form!)

    await waitFor(() => {
      expect(input).toBeDisabled()
    })
  })

  it('should navigate to results page on submit', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(/search with halal intentions/i)
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.submit(form!)

    expect(mockPush).toHaveBeenCalledWith('/results?q=test%20query')
  })

  it('should preserve initial query', () => {
    render(<SearchBar initialQuery="initial search" />)
    const input = screen.getByPlaceholderText(/search with halal intentions/i) as HTMLInputElement

    expect(input.value).toBe('initial search')
  })

  it('should trim whitespace from query', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(/search with halal intentions/i)
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '  test query  ' } })
    fireEvent.submit(form!)

    expect(mockPush).toHaveBeenCalledWith('/results?q=test%20query')
  })

  it('should render compact size when specified', () => {
    render(<SearchBar size="compact" />)
    const input = screen.getByPlaceholderText(/search with halal intentions/i)

    expect(input).toHaveClass('h-[45px]')
  })

  it('should render default size by default', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(/search with halal intentions/i)

    expect(input).toHaveClass('h-[54px]')
  })
})
