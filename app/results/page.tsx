export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = (q ?? '').trim()

  return (
    <main className="min-h-screen bg-primary-bg px-27 py-54 text-primary-text">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-27 text-center">
        <div className="flex h-63 w-63 items-center justify-center rounded-full border border-primary-text/30">
          <span className="h-36 w-36 animate-spin rounded-full border-4 border-primary-text/30 border-t-primary-text" />
        </div>
        <div className="space-y-18">
          <h1 className="text-h2">Fetching halal results...</h1>
          <p className="text-body text-primary-text/70">
            {query
              ? `Preparing your swarm search for “${query}”.`
              : 'Preparing your swarm search.'}
          </p>
        </div>
      </div>
    </main>
  )
}
