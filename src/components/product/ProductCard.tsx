'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)
  const showPrice = product.comparePrice || product.originalPrice

  return (
    <div className="group cursor-pointer h-full flex flex-col">
      <Link href={`/shop/${product.slug}`} className="block flex-1">
        <div className="bg-surface-bright rounded-2xl aspect-[4/5] relative mb-4 overflow-hidden flex items-center justify-center p-8 ambient-shadow hover-lift">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-on-primary rounded-full font-sans text-label-caps z-10">
              New
            </span>
          )}
          {showPrice && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-secondary text-white rounded-full font-sans text-label-caps z-10">
              Sale
            </span>
          )}
            <button
              onClick={(e) => {
                e.preventDefault()
                wishlisted ? removeItem(product.id) : addToWishlist(product)
              }}
              className="absolute top-2 right-2 md:top-4 md:right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center ambient-shadow transition-all duration-300 hover:opacity-100 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
            >
              <Heart size={16} className={wishlisted ? 'fill-secondary text-secondary' : 'text-primary'} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                addItem(product)
              }}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center ambient-shadow transition-all duration-300 text-primary hover:bg-primary hover:text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 z-10"
            >
              <ShoppingBag size={18} />
            </button>
        </div>
      </Link>
      <Link href={`/shop/${product.slug}`}>
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-headline-sm text-primary mb-0.5 truncate">{product.name}</h3>
            <p className="font-sans text-body-md text-on-surface-variant truncate">{product.category}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="font-sans text-label-caps text-primary whitespace-nowrap">{formatPrice(product.price)}</span>
            {showPrice && (
              <span className="font-sans text-label-caps text-on-surface-variant line-through ml-1.5 whitespace-nowrap">{formatPrice(showPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
