// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Analytics from '@/components/Analytics'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Studio & Web Solutions | Professional Recording & SaaS Development',
  description: 'Professional recording studio and SaaS platform development services. Music production, web applications, and digital media solutions.',
  keywords: 'recording studio, web development, SaaS, music production, audio mixing, full-stack developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
