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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    setIsLoading(true)
    try {
      await fetch(`/api/swarm?q=${encodeURIComponent(trimmedQuery)}`)
    } finally {
      setIsLoading(false)
      router.push(`/results?q=${encodeURIComponent(trimmedQuery)}`)
    }
  }

  return (
    <form
      className={`flex w-full items-center justify-center gap-4 ${className ?? ""}`}
      onSubmit={handleSubmit}
    >
      <VoiceButton />
      <div className={wrapperClassName}>
        <input
          type="text"
          placeholder="Search with halal intentions..."
          className={
            isCompact
              ? "h-11 w-full rounded-full border border-[#D4AF37]/70 bg-[#0A1929] pl-4 pr-12 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 disabled:opacity-70"
              : "h-[54px] w-full rounded-[9px] border-2 border-[#D4AF37] bg-[#0A1929] pl-4 pr-12 text-white placeholder:text-white/60 focus:outline-none disabled:opacity-70"
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          aria-label="Search"
          disabled={isLoading}
          className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#D4AF37] disabled:opacity-70"
        >
          {isLoading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#D4AF37]/40 border-t-[#D4AF37]" />
          ) : (
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
          )}
        </button>
      </div>
    </form>
  )
}
