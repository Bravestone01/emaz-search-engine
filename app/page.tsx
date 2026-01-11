"use client"

import SearchBar from "@/components/core/SearchBar"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-br from-[#000B1E] via-[#0A1929] to-[#0D1F33] text-center text-white">
      {/* Animated Background Orbs - 369 Theme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[9%] top-[18%] h-[369px] w-[369px] animate-pulse rounded-full bg-[#D4AF37] opacity-5 blur-[90px]" />
        <div className="absolute right-[9%] bottom-[18%] h-[270px] w-[270px] animate-pulse rounded-full bg-[#FFD700] opacity-5 blur-[72px] animation-delay-1000" />
        <div className="absolute left-[27%] bottom-[27%] h-[180px] w-[180px] animate-pulse rounded-full bg-[#D4AF37] opacity-5 blur-[54px] animation-delay-2000" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-[36px]">
        <div className="mb-[18px] flex items-center justify-center gap-[9px]">
          <div className="h-[9px] w-[9px] animate-pulse rounded-full bg-[#FFD700] shadow-[0_0_18px_rgba(255,215,0,0.6)]" />
          <div className="h-[9px] w-[9px] animate-pulse rounded-full bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.6)] animation-delay-300" />
          <div className="h-[9px] w-[9px] animate-pulse rounded-full bg-[#FFD700] shadow-[0_0_18px_rgba(255,215,0,0.6)] animation-delay-600" />
        </div>
        <h1 className="text-[72px] font-bold tracking-[0.36rem] text-white drop-shadow-[0_0_27px_rgba(255,215,0,0.3)] transition-all duration-700 hover:text-[#FFD700] hover:drop-shadow-[0_0_45px_rgba(255,215,0,0.6)]">
          EMAZ
        </h1>
        <div className="mt-[9px] flex items-center justify-center gap-[18px]">
          <div className="h-[3px] w-[36px] rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <p className="text-[9px] font-bold uppercase tracking-[0.54rem] text-[#D4AF37]">369 Philosophy</p>
          <div className="h-[3px] w-[36px] rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>

      {/* Search Section */}
      <div className="absolute top-[60vh] z-10 flex w-full -translate-y-1/2 flex-col items-center px-[27px]">
        <div className="w-full max-w-[900px]">
          <SearchBar />
        </div>
        <p className="mt-[27px] text-[14px] font-medium tracking-[0.18rem] text-white/80">
          <span className="text-[#FFD700]">Search</span>
          {' · '}
          <span className="text-[#FFD700]">Earn</span>
          {' · '}
          <span className="text-[#FFD700]">Give</span>
        </p>
        <p className="mt-[9px] text-[9px] font-semibold uppercase tracking-[0.27rem] text-white/60">
          Halal Ecosystem
        </p>

        {/* Feature Pills */}
        <div className="mt-[36px] flex flex-wrap items-center justify-center gap-[9px]">
          <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5 px-[18px] py-[9px] text-[9px] font-semibold uppercase tracking-[0.18rem] text-[#D4AF37] backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_18px_rgba(212,175,55,0.3)]">
            ✦ Privacy First
          </span>
          <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5 px-[18px] py-[9px] text-[9px] font-semibold uppercase tracking-[0.18rem] text-[#D4AF37] backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_18px_rgba(212,175,55,0.3)]">
            ✦ Swarm Search
          </span>
          <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5 px-[18px] py-[9px] text-[9px] font-semibold uppercase tracking-[0.18rem] text-[#D4AF37] backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_18px_rgba(212,175,55,0.3)]">
            ✦ Voice Enabled
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-[27px] z-10 text-[9px] font-medium uppercase tracking-[0.27rem] text-white/40">
        Powered by 5 Search Sources
      </div>

    </main>
  )
}
