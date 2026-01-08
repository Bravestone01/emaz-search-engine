import Link from 'next/link'

const TOTAL_PAGES = 3

type PaginationProps = {
  currentPage: number
  query: string
}

function buildHref(query: string, page: number) {
  const params = new URLSearchParams()
  if (query) {
    params.set('q', query)
  }
  params.set('page', String(page))
  return `/results?${params.toString()}`
}

export default function Pagination({ currentPage, query }: PaginationProps) {
  const previousPage = Math.max(1, currentPage - 1)
  const nextPage = Math.min(TOTAL_PAGES, currentPage + 1)

  return (
    <nav className="flex flex-wrap items-center justify-center gap-18 text-small text-primary-text">
      <Link
        href={buildHref(query, previousPage)}
        aria-disabled={currentPage === 1}
        className={`rounded-full border border-primary-text px-18 py-9 transition-colors hover:bg-primary-secondary ${
          currentPage === 1 ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Previous
      </Link>
      {Array.from({ length: TOTAL_PAGES }, (_, index) => {
        const page = index + 1
        const isActive = page === currentPage
        return (
          <Link
            key={page}
            href={buildHref(query, page)}
            className={`rounded-full border px-18 py-9 transition-colors ${
              isActive
                ? 'border-primary-text bg-primary-text text-primary-bg'
                : 'border-primary-text hover:bg-primary-secondary'
            }`}
          >
            Page {page}
          </Link>
        )
      })}
      <Link
        href={buildHref(query, nextPage)}
        aria-disabled={currentPage === TOTAL_PAGES}
        className={`rounded-full border border-primary-text px-18 py-9 transition-colors hover:bg-primary-secondary ${
          currentPage === TOTAL_PAGES ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Next
      </Link>
    </nav>
  )
}
