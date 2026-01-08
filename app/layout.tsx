import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EMAZ Search',
  description: 'A 369 design system search experience',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-emaz-blue text-emaz-gold antialiased"
        style={{
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <main className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-9 p-27">
          {children}
        </main>
      </body>
    </html>
  )
}
