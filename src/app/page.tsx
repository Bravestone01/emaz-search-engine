export default function Home() {
  return (
    <main className="min-h-screen bg-emaz-blue flex flex-col">
      {/* Simple Header - More Minimal */}
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emaz-gold rounded-lg"></div>
            <div className="text-emaz-gold font-bold text-xl">EMAZ</div>
          </div>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-white px-3 py-1 rounded hover:bg-white/5">
              About
            </button>
            <button className="text-gray-400 hover:text-white px-3 py-1 rounded hover:bg-white/5">
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo with tagline */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-emaz-gold via-yellow-300 to-emaz-gold bg-clip-text text-transparent">
            EMAZ
          </h1>
          <p className="text-gray-400 text-lg">Search with Purpose</p>
        </div>

        {/* Search Box - More Unique */}
        <div className="w-full max-w-2xl mb-8">
          <div className="relative group">
            <input
              type="text"
              placeholder="What would you like to search today?"
              className="w-full p-4 pl-6 rounded-xl bg-white/5 border border-gray-800 
                       text-white placeholder-gray-500 focus:outline-none 
                       focus:border-emaz-gold/50 focus:ring-2 focus:ring-emaz-gold/30
                       transition-all duration-300 group-hover:border-gray-600
                       shadow-lg shadow-black/20"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button
                className="p-2 text-gray-500 hover:text-emaz-gold hover:bg-white/5 rounded-lg transition-colors"
                title="Voice Search"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className="p-2 text-emaz-gold hover:bg-emaz-gold/10 rounded-lg transition-colors"
                title="Search"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {['Technology', 'Science', 'Business', 'Health', 'Education'].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white 
                         rounded-lg text-sm transition-colors border border-white/5"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons - Better Design */}
        <div className="flex gap-4">
          <button
            className="px-8 py-3 bg-emaz-gold text-emaz-blue font-medium 
                           rounded-lg hover:bg-emaz-gold/90 hover:shadow-lg 
                           hover:shadow-emaz-gold/20 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            Search EMAZ
          </button>
          <button
            className="px-8 py-3 bg-white/5 text-white font-medium 
                           rounded-lg hover:bg-white/10 hover:shadow-lg 
                           border border-white/10 transition-all"
          >
            Feeling Adventurous
          </button>
        </div>

        {/* Stats or Info */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Ethical Search • Privacy Focused • Ad-Free Experience</p>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="p-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 EMAZ Search. A halal and ethical search engine powered by 369 technology.</p>
          <div className="flex justify-center gap-6 mt-3">
            <a href="#" className="hover:text-emaz-gold">
              Privacy
            </a>
            <a href="#" className="hover:text-emaz-gold">
              Terms
            </a>
            <a href="#" className="hover:text-emaz-gold">
              About
            </a>
            <a href="#" className="hover:text-emaz-gold">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
