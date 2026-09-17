import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider'
import { ScrollProgress } from '@/components/animations/ScrollProgress'
import { CursorFollower } from '@/components/animations/CursorFollower'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const siteUrl = 'https://harshverma.dev'
const description =
  'BCA student at DPG Degree College, Gurugram building Python tools, AI assistants, systems projects, Discord bots and ML experiments. Focused on low-level tooling, audio/voice systems and low-latency APIs.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Harsh Verma — Python & Systems Developer',
    template: '%s — Harsh Verma',
  },
  description,
  applicationName: 'Harsh Verma — Portfolio',
  authors: [{ name: 'Harsh Verma' }],
  creator: 'Harsh Verma',
  keywords: [
    'Harsh Verma',
    'Python developer',
    'systems programming',
    'AI/ML',
    'Discord bots',
    'developer automation',
    'BCA',
    'DPG Degree College',
    'Gurugram',
  ],
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Harsh Verma — Python & Systems Developer',
    description,
    siteName: 'Harsh Verma',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsh Verma — Python & Systems Developer',
    description,
    creator: '@harshverma',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png' },
    ],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0c0d0e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScrollProvider>
          <ScrollProgress />
          <CursorFollower />
          {children}
        </SmoothScrollProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
