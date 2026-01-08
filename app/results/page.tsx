import { headers } from 'next/headers'

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
    <main className="min-h-screen bg-primary-bg px-6 py-12 text-primary-text sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <div className="space-y-3 text-left">
          <p className="text-small text-primary-text/70">Total results: {TOTAL_RESULTS}</p>
          <h1 className="text-h2">Halal search results</h1>
          <p className="text-body text-primary-text/70">
            {query ? `Showing results for “${query}”.` : 'Showing the latest swarm discoveries.'}
          </p>
        </div>

        <section className="flex flex-col gap-8">
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
      </div>
    </main>
  )
}
