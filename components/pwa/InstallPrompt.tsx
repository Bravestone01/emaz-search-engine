"use client"

import { useEffect, useMemo, useState } from "react"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const isMobile = useMemo(() => {
    if (typeof navigator === "undefined") {
      return false
    }
    return /android|iphone|ipad|ipod/i.test(navigator.userAgent)
  }, [])

  useEffect(() => {
    if (!isMobile || typeof window === "undefined") {
      return
    }

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true

    if (isStandalone) {
      return
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setIsVisible(true)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setIsVisible(false)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [isMobile])

  if (!isVisible || !deferredPrompt) {
    return null
  }

  const handleInstall = async () => {
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setIsVisible(false)
    setDeferredPrompt(null)
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border border-[#D4AF37]/60 bg-[#0A1929] px-5 py-4 shadow-lg sm:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Install App</p>
          <p className="text-xs text-white/70">Add to Home Screen for quick access.</p>
        </div>
        <button
          type="button"
          onClick={handleInstall}
          className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-[#0A1929]"
        >
          Add to Home Screen
        </button>
      </div>
    </div>
  )
}
