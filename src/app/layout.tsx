import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Canada Clock — every time zone, right now',
  description:
    'Live local time across all six of Canada’s time zones, from Pacific to Newfoundland.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="aurora" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
