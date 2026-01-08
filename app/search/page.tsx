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
    <main className="px-27 py-36">
      <div className="mx-auto max-w-3xl">
        <div className="mb-27">
          <p className="text-18 uppercase tracking-[0.3em] text-emaz-gold/60">
            EMAZ Search
          </p>
          <h1 className="mt-18 text-36">Results for “{data.query || '—'}”</h1>
        </div>

        {data.results.length === 0 ? (
          <p className="text-18 text-emaz-gold/60">No results found. Try another search.</p>
        ) : (
          <ul className="space-y-18">
            {data.results.map((result) => (
              <li
                key={result.link}
                className="rounded-9 border border-emaz-secondary bg-emaz-secondary/70 p-27"
              >
                <a
                  href={result.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-27 text-emaz-gold hover:underline"
                >
                  {result.title}
                </a>
                <p className="mt-9 text-18 text-emaz-gold/50">{result.link}</p>
                <p className="mt-18 text-18 text-emaz-gold/70 leading-relaxed">
                  {result.snippet}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
