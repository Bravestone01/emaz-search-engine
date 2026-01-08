export default function Home() {
  return (
    <main className="min-h-screen bg-emaz-blue flex flex-col">
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-emaz-gold font-bold text-xl">EMAZ</div>
          <div className="flex gap-4">
            <button className="text-white hover:text-emaz-gold">About</button>
            <button className="text-white hover:text-emaz-gold">Settings</button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl font-bold mb-8 text-emaz-gold">EMAZ</h1>

        <div className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search the web..."
              className="w-full p-4 rounded-full bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-emaz-gold focus:ring-1 focus:ring-emaz-gold"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                🎤
              </button>
              <button className="p-2 text-emaz-gold hover:bg-white/10 rounded-full">
                🔍
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-emaz-gold text-emaz-blue rounded-lg font-medium hover:bg-emaz-gold/90">
            Search
          </button>
          <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20">
            I'm Feeling Lucky
          </button>
        </div>
      </div>

      <footer className="p-4 text-center text-gray-400 text-sm">
        © 2024 EMAZ Search. Halal and Ethical Search Engine.
      </footer>
    </main>
  )
}
