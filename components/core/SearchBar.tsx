"use client"

import VoiceButton from "./VoiceButton"

export default function SearchBar() {
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <VoiceButton />
      <div className="relative w-full max-w-[90%] flex-1">
        <input
          type="text"
          placeholder="Search with halal intentions..."
          className="h-[54px] w-full rounded-[9px] border-2 border-[#D4AF37] bg-[#0A1929] pl-4 pr-12 text-white placeholder:text-white/60 focus:outline-none"
        />
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
    </div>
  )
}
