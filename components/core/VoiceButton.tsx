"use client"

import { useState } from "react"

export default function VoiceButton() {
  const [isListening, setIsListening] = useState(false)

  const handleClick = () => {
    setIsListening((current) => !current)
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#FFD700] text-[#0A1929] transition hover:brightness-110"
        aria-label="Voice search"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="currentColor"
        >
          <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3z" />
          <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.08A7 7 0 0 0 19 11z" />
        </svg>
      </button>
      {isListening ? (
        <span className="mt-1 text-xs font-medium text-[#FFD700]">
          Listening...
        </span>
      ) : null}
    </div>
  )
}
