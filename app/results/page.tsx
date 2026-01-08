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

function buildFallbackResults(startId: number, count: number): ResultItem[] {
  return Array.from({ length: count }, (_, index) => {
    const id = startId + index
    return {
      id,
      title: `Result ${id}`,
      description: 'Description...',
      source: 'Wikipedia',
      url: '#',
    }
  })
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

  const response = await fetch(
    await buildAbsoluteUrl(`/api/swarm?q=${encodeURIComponent(query)}`),
    {
      cache: 'no-store',
    },
  )

  const data = (await response.json()) as SwarmApiResponse
  const apiResults = data.results ?? []
  const trimmedResults = apiResults.slice(0, TOTAL_RESULTS)
  const filledResults =
    trimmedResults.length < TOTAL_RESULTS
      ? trimmedResults.concat(buildFallbackResults(trimmedResults.length + 1, TOTAL_RESULTS - trimmedResults.length))
      : trimmedResults

  const results: ResultItem[] = filledResults.map((result, index) => ({
    ...result,
    id: index + 1,
  }))

  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
  const pagedResults = results.slice(startIndex, startIndex + RESULTS_PER_PAGE)

  return (
    <main className="min-h-screen bg-primary-bg text-primary-text">
      <div className="border-b border-primary-text/10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:gap-8">
          <a href="/" className="text-xl font-semibold tracking-[0.2rem] text-primary-text">
            EMAZ
          </a>
          <SearchBar className="w-full justify-start" initialQuery={query} size="compact" />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
        <div className="space-y-2 text-left">
          <p className="text-xs uppercase tracking-[0.3rem] text-primary-text/60">Halal search results</p>
          <h1 className="text-2xl font-semibold text-primary-text">
            {query ? `Results for “${query}”` : 'Latest swarm discoveries'}
          </h1>
          <p className="text-sm text-primary-text/60">About {TOTAL_RESULTS} results</p>
        </div>

        <section className="flex flex-col gap-4">
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
        <Disclosure />
      </div>
    </main>
  )
}
