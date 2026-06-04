'use client'

import { Container } from '@/components/ui'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useWishlist } from '@/context/WishlistContext'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function WishlistPage() {
  const { items, itemCount } = useWishlist()

  return (
    <div className="py-16 md:py-24">
      <Container>
        <h1 className="font-serif text-headline-lg text-primary mb-2">My Wishlist</h1>
        <p className="font-sans text-body-md text-on-surface-variant mb-12">{itemCount} saved items</p>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={48} className="mx-auto text-on-surface-variant mb-6" />
            <h2 className="font-serif text-headline-sm text-primary mb-4">Your wishlist is empty</h2>
            <p className="font-sans text-body-md text-on-surface-variant mb-8">Save items you love and come back to them later.</p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </Container>
    </div>
  )
}
