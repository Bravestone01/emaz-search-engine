import { headers } from 'next/headers'

import SearchBar from '@/components/core/SearchBar'
import Disclosure from '@/components/affiliate/Disclosure'
import Pagination from '@/components/results/Pagination'
import ResultCard from '@/components/results/ResultCard'

type SwarmApiResult = {
  title: string
  description: string
  source: string
  url: string
}

type SwarmApiResponse = {
  query: string
  results: SwarmApiResult[]
}

type ResultItem = SwarmApiResult & {
  id: number
}

const RESULTS_PER_PAGE = 9
const TOTAL_PAGES = 3
const TOTAL_RESULTS = RESULTS_PER_PAGE * TOTAL_PAGES

async function buildAbsoluteUrl(path: string) {
  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const protocol = headersList.get('x-forwarded-proto') ?? 'http'
  return `${protocol}://${host}${path}`
}


export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q, page } = await searchParams
  const query = (q ?? '').trim()
  const requestedPage = Number(page)
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), TOTAL_PAGES)

  let response
  let hasError = false

  try {
    response = await fetch(
      await buildAbsoluteUrl(`/api/swarm?q=${encodeURIComponent(query)}`),
      {
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      hasError = true
    }
  } catch (error) {
    hasError = true
  }

  const data = hasError ? { query, results: [] } : ((await response!.json()) as SwarmApiResponse)
  const apiResults = data.results ?? []
  const trimmedResults = apiResults.slice(0, TOTAL_RESULTS)

  const results: ResultItem[] = trimmedResults.map((result, index) => ({
    ...result,
    id: index + 1,
  }))

  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
  const pagedResults = results.slice(startIndex, startIndex + RESULTS_PER_PAGE)

  return (
    <main className="min-h-screen bg-primary-bg text-primary-text">
      <div className="border-b border-primary-text/10 shadow-lg backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-[27px] px-[27px] py-[27px] sm:flex-row sm:items-center sm:gap-[36px]">
          <a
            href="/"
            className="text-[27px] font-bold tracking-[0.27rem] text-primary-text transition-all duration-300 hover:text-[#FFD700] hover:scale-105"
          >
            EMAZ
          </a>
          <SearchBar className="w-full justify-start" initialQuery={query} size="compact" />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-[27px] px-[27px] py-[36px]">
        <div className="space-y-[9px] text-left">
          <p className="text-[9px] font-bold uppercase tracking-[0.36rem] text-primary-text/60">
            Halal Search Results
          </p>
          <h1 className="text-[27px] font-bold leading-[36px] text-primary-text">
            {query ? (
              <>
                Results for{' '}
                <span className="text-[#FFD700]">"{query}"</span>
              </>
            ) : (
              'Latest Swarm Discoveries'
            )}
          </h1>
          <p className="text-[14px] font-medium text-primary-text/60">
            {hasError ? (
              <span className="text-red-400">⚠ Could not fetch results. Showing cached data.</span>
            ) : (
              `About ${results.length} results found`
            )}
          </p>
        </div>

        {pagedResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-[27px] rounded-[9px] border-2 border-[#D4AF37]/30 bg-gradient-to-br from-[#0A1929] to-[#0D1F33] px-[36px] py-[72px] shadow-xl">
            <div className="text-[54px]">🔍</div>
            <h2 className="text-[27px] font-bold text-[#FFD700]">No Results Found</h2>
            <p className="text-center text-[14px] text-primary-text/60">
              {hasError
                ? 'We encountered an error while searching. Please try again.'
                : `No results found for "${query}". Try different keywords.`}
            </p>
            <a
              href="/"
              className="rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 px-[27px] py-[9px] font-semibold text-[#FFD700] transition-all duration-300 hover:scale-105 hover:bg-[#D4AF37]/20 hover:shadow-[0_0_27px_rgba(212,175,55,0.4)]"
            >
              ← Back to Home
            </a>
          </div>
        ) : (
          <>
            <section className="flex flex-col gap-[18px]">
              {pagedResults.map((result) => (
                <ResultCard
                  key={result.id}
                  title={result.title}
                  description={result.description}
                  source={result.source}
                  url={result.url}
                />
              ))}
            </section>

            <Pagination currentPage={currentPage} query={query} />
          </>
        )}

        <Disclosure />
      </div>
    </main>
  )
}
