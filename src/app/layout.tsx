import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import './globals.css'

const siteUrl = 'https://www.glasseermart.store'
const siteName = 'GlaseerMart'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Premium Optical & Stylish Glasses`,
    template: `%s | ${siteName}`,
  },
  description: 'Discover luxury eyewear crafted for the discerning eye. Premium optical glasses, fashion frames, and sunglasses at GlaseerMart.',
  keywords: ['eyewear', 'glasses', 'sunglasses', 'optical', 'luxury glasses', 'prescription glasses', 'fashion frames', 'premium eyewear', 'GlaseerMart'],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} | Premium Optical & Stylish Glasses`,
    description: 'Discover luxury eyewear crafted for the discerning eye. Premium optical glasses, fashion frames, and sunglasses at GlaseerMart.',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Premium Optical & Stylish Glasses`,
    description: 'Discover luxury eyewear crafted for the discerning eye. Premium optical glasses, fashion frames, and sunglasses at GlaseerMart.',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  verification: {
    google: 'MuSNW56DxlekGi29aUAC3a1yNflFSSRtZGvaew8XcdM',
  },
  category: 'shopping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://wavigfakgctkcgjfbswv.supabase.co" />
        <link rel="dns-prefetch" href="https://wavigfakgctkcgjfbswv.supabase.co" />
      </head>
      <body className="font-sans text-on-surface antialiased min-h-screen flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'GlaseerMart',
              url: siteUrl,
              logo: `${siteUrl}/images/logo.png`,
              image: `${siteUrl}/images/logo.png`,
              description: 'Premium optical glasses, fashion frames, and sunglasses.',
              email: 'contact@glasseermart.store',
              currencyAccepted: 'PKR',
              paymentAccepted: 'Cash on Delivery',
              priceRange: '₨500 - ₨50,000',
              sameAs: [
                'https://www.instagram.com/glaseer.mart',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PK',
              },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'PKR',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
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
