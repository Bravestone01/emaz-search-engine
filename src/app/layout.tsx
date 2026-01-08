import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'EMAZ | Premium Search',
  description: 'A premium, minimal search experience.',
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
