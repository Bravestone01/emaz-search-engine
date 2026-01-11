"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import VoiceButton from "./VoiceButton"

type SearchBarProps = {
  initialQuery?: string
  size?: "default" | "compact"
  className?: string
}

export default function SearchBar({ initialQuery = "", size = "default", className }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [isLoading, setIsLoading] = useState(false)
  const isCompact = size === "compact"
  const wrapperClassName = isCompact ? "relative w-full max-w-2xl flex-1" : "relative w-full max-w-[90%] flex-1"

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    setIsLoading(true)
    router.push(`/results?q=${encodeURIComponent(trimmedQuery)}`)
  }

  return (
    <form
      className={`flex w-full items-center justify-center gap-[18px] ${className ?? ""}`}
      onSubmit={handleSubmit}
    >
      <VoiceButton />
      <div className={wrapperClassName}>
        <input
          type="text"
          placeholder="Search with halal intentions..."
          className={
            isCompact
              ? "h-[45px] w-full rounded-full border-2 border-[#D4AF37]/70 bg-[#0A1929] px-[18px] pr-[54px] text-sm text-white placeholder:text-white/60 shadow-lg transition-all duration-300 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:shadow-[0_0_18px_rgba(212,175,55,0.3)] disabled:opacity-50"
              : "h-[54px] w-full rounded-[9px] border-2 border-[#D4AF37] bg-[#0A1929] px-[18px] pr-[63px] text-white placeholder:text-white/60 shadow-xl transition-all duration-300 focus:border-[#FFD700] focus:outline-none focus:ring-[3px] focus:ring-[#D4AF37]/50 focus:shadow-[0_0_27px_rgba(212,175,55,0.5)] disabled:opacity-50"
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          aria-label="Search"
          disabled={isLoading || !query.trim()}
          className="absolute right-[18px] top-1/2 flex -translate-y-1/2 items-center justify-center text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:text-[#FFD700] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="h-[27px] w-[27px] animate-spin rounded-full border-[3px] border-[#D4AF37]/30 border-t-[#D4AF37]" />
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[27px] w-[27px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}
