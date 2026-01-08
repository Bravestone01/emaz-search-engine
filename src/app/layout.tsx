import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EMAZ Search Engine',
  description: '369 Design System Search Engine',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}