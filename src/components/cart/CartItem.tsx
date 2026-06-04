'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types'

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-6 py-6 border-b border-outline-variant">
      <Link href={`/shop/${item.product.slug}`} className="w-24 h-24 bg-surface-bright rounded-xl flex items-center justify-center p-4 flex-shrink-0">
        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link href={`/shop/${item.product.slug}`} className="font-serif text-headline-sm text-primary hover:text-secondary transition-colors">
              {item.product.name}
            </Link>
            {item.selectedColor && (
              <p className="font-sans text-sm text-on-surface-variant">{item.selectedColor}</p>
            )}
          </div>
          <button onClick={() => removeItem(item.product.id)} className="text-on-surface-variant hover:text-primary transition-colors p-1">
            <X size={16} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border border-outline-variant rounded-lg">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-3 py-1.5 font-sans text-sm text-primary hover:bg-surface-container-low transition-colors"
            >
              -
            </button>
            <span className="px-3 py-1.5 font-sans text-sm text-primary border-x border-outline-variant min-w-[2.5rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-3 py-1.5 font-sans text-sm text-primary hover:bg-surface-container-low transition-colors"
            >
              +
            </button>
          </div>
          <span className="font-sans text-label-caps text-primary">{formatPrice(item.product.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  )
}
