import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { SiteLayout } from '@/components/layout/SiteLayout'
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
        <link rel="preconnect" href="https://lwyvsnbkarxpcvykmakk.supabase.co" />
        <link rel="dns-prefetch" href="https://lwyvsnbkarxpcvykmakk.supabase.co" />
      </head>
      <body className="font-sans text-on-surface antialiased min-h-screen flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteUrl}/#organization`,
                  name: 'GlaseerMart',
                  url: siteUrl,
                  logo: `${siteUrl}/images/logo.png`,
                  image: `${siteUrl}/images/logo.png`,
                  description: 'Premium optical glasses, fashion frames, and sunglasses in Pakistan.',
                  email: 'contact@glasseermart.store',
                  address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
                  areaServed: ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Faisalabad', 'Rawalpindi', 'Multan', 'Quetta', 'Hyderabad'],
                  sameAs: ['https://www.instagram.com/glaseer.mart', 'https://www.facebook.com/share/1Gr542DxdL/', 'https://www.tiktok.com/@glaseer.mart'],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  url: siteUrl,
                  name: 'GlaseerMart',
                  description: 'Premium eyewear & glasses online in Pakistan.',
                  publisher: { '@id': `${siteUrl}/#organization` },
                  inLanguage: 'en',
                },
                {
                  '@type': 'Store',
                  '@id': `${siteUrl}/#store`,
                  url: siteUrl,
                  name: 'GlaseerMart',
                  image: `${siteUrl}/images/logo.png`,
                  description: 'Premium optical glasses, fashion frames, and sunglasses in Pakistan.',
                  parentOrganization: { '@id': `${siteUrl}/#organization` },
                  currencyAccepted: 'PKR',
                  paymentAccepted: 'Cash on Delivery',
                  priceRange: '₨500 - ₨50,000',
                  address: { '@type': 'PostalAddress', addressCountry: 'PK' },
                  makesOffer: [
                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Prescription Glasses', category: 'Eyewear' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Sunglasses', category: 'Eyewear' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Blue Light Glasses', category: 'Eyewear' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Computer Glasses', category: 'Eyewear' } },
                  ],
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': `${siteUrl}/#breadcrumb`,
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
                    { '@type': 'ListItem', position: 2, name: 'Shop', item: `${siteUrl}/shop` },
                  ],
                },
              ],
            }),
          }}
        />
        <CartProvider>
          <WishlistProvider>
            <SiteLayout>{children}</SiteLayout>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
