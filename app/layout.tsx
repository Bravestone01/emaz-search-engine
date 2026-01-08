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
      <body className="min-h-screen bg-emaz-blue text-emaz-gold antialiased">
        {children}
      </body>
    </html>
  )
}
