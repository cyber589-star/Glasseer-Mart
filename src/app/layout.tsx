import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import './globals.css'

export const metadata: Metadata = {
  title: 'GlaseerMart | Premium Optical & Stylish Glasses',
  description: 'Discover luxury eyewear crafted for the discerning eye. Premium optical glasses, fashion frames, and sunglasses at GlaseerMart.',
  keywords: 'eyewear, glasses, sunglasses, optical, luxury glasses, prescription glasses, fashion frames',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="googleacce47e7428bb71c" />
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className="font-sans text-on-surface antialiased min-h-screen flex flex-col bg-white">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-grow pt-[72px]">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
