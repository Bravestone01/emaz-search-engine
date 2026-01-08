"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import VoiceButton from "./VoiceButton"

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
      className="flex w-full items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <VoiceButton />
      <div className="relative w-full max-w-[90%] flex-1">
        <input
          type="text"
          placeholder="Search with halal intentions..."
          className="h-[54px] w-full rounded-[9px] border-2 border-[#D4AF37] bg-[#0A1929] pl-4 pr-12 text-white placeholder:text-white/60 focus:outline-none disabled:opacity-70"
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
