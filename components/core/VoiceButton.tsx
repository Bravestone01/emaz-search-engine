"use client"

import { useEffect, useRef, useState } from "react"

type SpeechRecognitionConstructor = new () => SpeechRecognition

export default function VoiceButton() {
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
      alert("Voice search not supported in your browser")
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

    recognition.onresult = (event: any) => {
      const nextTranscript = event.results[0][0].transcript
      setIsListening(false)
      window.location.href = `/results?q=${encodeURIComponent(nextTranscript)}`
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={startListening}
        className={`voice-button flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#FFD700] text-[#0A1929] transition hover:brightness-110 ${isListening ? "listening" : ""}`}
        aria-label="Voice search"
        aria-pressed={isListening}
        disabled={!isSupported}
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
      {!isSupported ? (
        <span className="mt-1 text-xs font-medium text-red-400">
          Voice search unavailable
        </span>
      ) : null}
    </div>
  )
}
