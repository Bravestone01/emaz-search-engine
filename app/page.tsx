import { Logo } from '@/components/shared/Logo'
import { NAV_LINKS, SITE_NAME, TAGLINE } from '@/lib/constants'

export default function Home() {
  return (
    <main className="min-h-screen bg-emaz-blue">
      <header className="border-b border-emaz-secondary/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-27 py-18">
          <Logo />
          <nav className="flex items-center gap-18 text-18">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                className="rounded-9 px-18 py-9 text-emaz-gold/70 transition hover:bg-emaz-secondary hover:text-emaz-gold"
                href="#"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-27 px-27 py-36">
        <div className="rounded-9 bg-emaz-secondary p-36">
          <p className="text-18 uppercase tracking-[0.2em] text-emaz-gold/70">
            369 Design System
          </p>
          <h1 className="mt-18 text-63 font-semibold">{SITE_NAME}</h1>
          <p className="mt-18 max-w-2xl text-27 text-emaz-gold/80">{TAGLINE}</p>
        </div>

        <div className="rounded-9 border border-emaz-secondary bg-emaz-blue/60 p-27">
          <label className="text-18 uppercase tracking-[0.2em] text-emaz-gold/70">
            Search the system
          </label>
          <div className="mt-18 flex flex-col gap-18 md:flex-row">
            <input
              className="w-full flex-1 rounded-9 border border-emaz-secondary bg-emaz-secondary px-18 py-18 text-18 text-emaz-gold placeholder:text-emaz-gold/40 focus:outline-none focus:ring-2 focus:ring-emaz-gold/40"
              placeholder="Search for knowledge, sound, or assets"
              type="text"
            />
            <button className="rounded-9 bg-emaz-gold px-27 py-18 text-18 font-semibold text-emaz-blue">
              Explore
            </button>
          </div>
        </div>

        <div className="grid gap-18 md:grid-cols-3">
          {['Focus', 'Precision', 'Ethics'].map((value) => (
            <div
              key={value}
              className="rounded-9 border border-emaz-secondary bg-emaz-secondary/70 p-27"
            >
              <p className="text-27 font-semibold">{value}</p>
              <p className="mt-9 text-18 text-emaz-gold/70">
                Designed around 9px rhythm, curated results, and mindful discovery.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
