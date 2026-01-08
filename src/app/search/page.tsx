import { headers } from 'next/headers'

type SearchResult = {
  title: string
  link: string
  snippet: string
}

type SearchResponse = {
  query: string
  results: SearchResult[]
}

function buildBaseUrl() {
  const headerStore = headers()
  const host = headerStore.get('host')
  const protocol = headerStore.get('x-forwarded-proto') ?? 'http'
  return `${protocol}://${host}`
}

async function fetchResults(query: string): Promise<SearchResponse> {
  const baseUrl = buildBaseUrl()
  const response = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    return { query, results: [] }
  }

  return response.json()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = (searchParams.q ?? '').trim()
  const data = query ? await fetchResults(query) : { query, results: [] }

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-white/50">EMAZ Search</p>
          <h1 className="text-3xl sm:text-4xl mt-4">Results for “{data.query || '—'}”</h1>
        </div>

        {data.results.length === 0 ? (
          <p className="text-white/60">No results found. Try another search.</p>
        ) : (
          <ul className="space-y-8">
            {data.results.map((result) => (
              <li key={result.link} className="lux-card lux-border p-6">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl text-lux-gold hover:underline"
                >
                  {result.title}
                </a>
                <p className="text-sm text-white/40 mt-2">{result.link}</p>
                <p className="text-white/70 mt-4 leading-relaxed">{result.snippet}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
