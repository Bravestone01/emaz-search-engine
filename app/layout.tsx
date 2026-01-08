import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary-bg text-primary-text antialiased [font-family:system-ui,sans-serif]">
        {children}
      </body>
    </html>
  )
}
