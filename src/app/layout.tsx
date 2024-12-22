import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'solar system simulator',
  description: 'a solar system simulator'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
