"use client"

import SearchBar from "@/components/core/SearchBar"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#0A1929] text-center text-white">
      <div className="pt-8">
        <h1 className="text-[54px] font-semibold tracking-wide">EMAZ</h1>
      </div>
      <div className="absolute top-[60vh] flex w-full -translate-y-1/2 flex-col items-center px-4">
        <div className="w-full max-w-[900px]">
          <SearchBar />
        </div>
        <p className="mt-6 text-sm text-white/80">
          Search. Earn. Give. - Halal Ecosystem
        </p>
      </div>
    </main>
  )
}
