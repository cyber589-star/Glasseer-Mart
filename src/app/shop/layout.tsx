import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Eyewear',
  description: 'Browse our premium collection of optical glasses, sunglasses, and fashion frames. Find your perfect pair at GlaseerMart.',
  openGraph: { title: 'Shop Eyewear | GlaseerMart', description: 'Browse premium optical glasses, sunglasses, and fashion frames.' },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
