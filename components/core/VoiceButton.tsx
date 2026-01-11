"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type SpeechRecognitionConstructor = new () => SpeechRecognition

export default function VoiceButton() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
      recognitionRef.current = null
    }
  }, [])

  const startListening = () => {
    if (isListening) {
      recognitionRef.current?.abort()
      setIsListening(false)
      return
    }

    const SpeechRecognition = (window as typeof window & {
      webkitSpeechRecognition?: SpeechRecognitionConstructor
      SpeechRecognition?: SpeechRecognitionConstructor
    }).SpeechRecognition ??
      (window as typeof window & { webkitSpeechRecognition?: SpeechRecognitionConstructor })
        .webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    const browserLanguage = navigator.language.toLowerCase()
    recognition.lang = browserLanguage.startsWith("ur") ? "ur-PK" : "en-US"
    recognition.continuous = false
    recognition.interimResults = false

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const nextTranscript = event.results[0][0].transcript
      setIsListening(false)
      router.push(`/results?q=${encodeURIComponent(nextTranscript)}`)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-[9px]">
      <button
        type="button"
        onClick={startListening}
        className={`voice-button relative flex h-[54px] w-[54px] items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] text-[#0A1929] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_27px_rgba(212,175,55,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
          isListening ? "listening animate-pulse scale-110 shadow-[0_0_36px_rgba(255,215,0,0.9)]" : ""
        }`}
        aria-label="Voice search"
        aria-pressed={isListening}
        disabled={!isSupported}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-[27px] w-[27px] transition-transform duration-300 ${isListening ? "scale-110" : ""}`}
          fill="currentColor"
        >
          <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3z" />
          <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.08A7 7 0 0 0 19 11z" />
        </svg>
        {isListening && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#FFD700] opacity-30" />
        )}
      </button>
      {isListening && (
        <span className="text-[9px] font-semibold uppercase tracking-[0.27rem] text-[#FFD700] animate-pulse">
          Listening...
        </span>
      )}
      {!isSupported && (
        <span className="text-[9px] font-semibold uppercase tracking-[0.18rem] text-red-400">
          Unavailable
        </span>
      )}
    </div>
  )
}
