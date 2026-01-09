import './globals.css'

import ThemeProvider from "@/components/core/ThemeProvider"
import InstallPrompt from "@/components/pwa/InstallPrompt"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000B1E" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
      </head>
      <body className="min-h-screen bg-primary-bg text-primary-text antialiased [font-family:system-ui,sans-serif]">
        <ThemeProvider>
          {children}
          <InstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  )
}
