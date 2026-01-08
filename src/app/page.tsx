export default function Home() {
  return (
    <main className="flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-white/50 mb-6">EMAZ</p>
        <h1 className="text-hero sm:text-[72px] mb-8">Search with clarity.</h1>
        <form action="/search" method="get" className="flex flex-col gap-4">
          <input
            type="text"
            name="q"
            placeholder="Search the web"
            required
            className="lux-card lux-border px-5 py-4 text-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lux-gold/60"
          />
          <button
            type="submit"
            className="rounded-full border border-lux-gold/60 px-6 py-3 text-sm uppercase tracking-[0.3em] text-lux-gold transition hover:bg-lux-gold hover:text-black"
          >
            Search
          </button>
        </form>
      </div>
    </main>
  )
}
