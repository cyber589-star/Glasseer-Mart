import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Save your favorite eyewear styles to your GlaseerMart wishlist.',
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
