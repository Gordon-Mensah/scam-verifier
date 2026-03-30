import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'ScamVerifier — Free AI Fraud Intelligence',
  description:
    'Paste any opportunity, pitch, or suspicious offer and get a free AI-powered legitimacy report in under 60 seconds.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'ScamVerifier — Free AI Fraud Intelligence',
    description: "Know if it's a scam before you commit. Free AI analysis of any opportunity, pitch, or offer.",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}