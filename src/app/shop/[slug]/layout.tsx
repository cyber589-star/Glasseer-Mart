import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Details',
  description: 'View product details, specs, and pricing for this premium eyewear from GlaseerMart.',
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children
}
