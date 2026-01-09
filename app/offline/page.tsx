"use client"

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0A1929] px-6 text-center text-white">
      <h1 className="text-3xl font-semibold">You are offline. Please check connection.</h1>
      <p className="mt-3 text-sm text-white/70">Reconnect to continue searching the EMAZ Empire.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-6 rounded-full bg-[#D4AF37] px-6 py-2 text-sm font-semibold text-[#0A1929]"
      >
        Try again
      </button>
    </main>
  )
}
