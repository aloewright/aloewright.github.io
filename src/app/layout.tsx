import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://aloewright.github.io'),
  title: 'Aloe Wright - Portfolio',
  description: 'Full-stack developer and software engineer portfolio',
  authors: [{ name: 'Aloe Wright', url: 'https://github.com/aloewright' }],
  keywords: ['portfolio', 'developer', 'github', 'projects', 'programming'],
  icons: {
    icon: 'https://avatars.githubusercontent.com/aloewright?v=4&s=32',
    shortcut: 'https://avatars.githubusercontent.com/aloewright?v=4&s=32',
    apple: 'https://avatars.githubusercontent.com/aloewright?v=4&s=180',
  },
  openGraph: {
    title: 'Aloe Wright - Portfolio',
    description: 'Full-stack developer and software engineer portfolio',
    url: 'https://aloewright.github.io',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/aloewright?v=4&s=1200',
        width: 1200,
        height: 1200,
        alt: 'Aloe Wright',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aloe Wright - Portfolio',
    description: 'Full-stack developer and software engineer portfolio',
    images: ['https://avatars.githubusercontent.com/aloewright?v=4&s=1200'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}