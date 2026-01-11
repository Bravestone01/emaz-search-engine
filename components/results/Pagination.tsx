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
    <nav className="flex flex-wrap items-center justify-center gap-[9px] text-[14px] font-semibold text-primary-text">
      <Link
        href={buildHref(query, previousPage)}
        aria-disabled={currentPage === 1}
        className={`rounded-full border-2 border-[#D4AF37]/60 px-[18px] py-[9px] transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_18px_rgba(212,175,55,0.2)] active:scale-95 ${
          currentPage === 1 ? 'pointer-events-none opacity-30' : ''
        }`}
      >
        ← Previous
      </Link>
      {Array.from({ length: TOTAL_PAGES }, (_, index) => {
        const page = index + 1
        const isActive = page === currentPage
        return (
          <Link
            key={page}
            href={buildHref(query, page)}
            className={`flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 transition-all duration-300 ${
              isActive
                ? 'border-[#FFD700] bg-gradient-to-br from-[#FFD700] to-[#D4AF37] text-[#0A1929] shadow-[0_0_27px_rgba(255,215,0,0.4)] scale-110 font-bold'
                : 'border-[#D4AF37]/60 hover:scale-110 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_18px_rgba(212,175,55,0.2)] active:scale-95'
            }`}
          >
            {page}
          </Link>
        )
      })}
      <Link
        href={buildHref(query, nextPage)}
        aria-disabled={currentPage === TOTAL_PAGES}
        className={`rounded-full border-2 border-[#D4AF37]/60 px-[18px] py-[9px] transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_18px_rgba(212,175,55,0.2)] active:scale-95 ${
          currentPage === TOTAL_PAGES ? 'pointer-events-none opacity-30' : ''
        }`}
      >
        Next →
      </Link>
    </nav>
  )
}