import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Numverter AI • Intelligent Number Conversion',
  description: 'AI-powered number conversion tool with natural language processing, OCR, voice input, and advanced mathematical operations.',
  keywords: 'number converter, AI conversion, binary calculator, hex converter, roman numerals, currency converter',
  authors: [{ name: 'Faizuddin' }],
  creator: 'Faizuddin',
  openGraph: {
    title: 'Numverter AI • Intelligent Number Conversion',
    description: 'AI-powered number conversion tool with natural language processing',
    url: 'https://numverter-ai.vercel.app',
    siteName: 'Numverter AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Numverter AI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Numverter AI • Intelligent Number Conversion',
    description: 'AI-powered number conversion tool with natural language processing',
    images: ['/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
