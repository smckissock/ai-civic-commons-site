// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aiciviccommons.org'),
  title: {
    default: 'AI Civic Commons',
    template: '%s | AI Civic Commons',
  },
  description:
    'Open resources for AI education and public advocacy — organization registry, program library, policy frameworks, article repository, and international development projects.',
  keywords: [
    'AI education',
    'AI policy',
    'AI governance',
    'public advocacy',
    'AI ethics',
    'AI literacy',
    'civic technology',
  ],
  authors: [{ name: 'AI Civic Commons', url: 'https://www.aiciviccommons.org' }],
  creator: 'AI Civic Commons',
  openGraph: {
    type: 'website',
    siteName: 'AI Civic Commons',
    url: 'https://www.aiciviccommons.org',
    title: 'AI Civic Commons',
    description:
      'Open resources for AI education and public advocacy — organization registry, program library, policy frameworks, and more.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Civic Commons',
    description:
      'Open resources for AI education and public advocacy.',
    site: '@aiciviccommons',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.aiciviccommons.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* Skip to main content — first focusable element, required for 508 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border focus:border-black focus:rounded"
        >
          Skip to main content
        </a>

        {children}

      </body>
    </html>
  )
}