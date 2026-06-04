'use client'

import { Container } from '@/components/ui'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { useCart } from '@/context/CartContext'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, itemCount } = useCart()

  return (
    <div className="py-16 md:py-24">
      <Container>
        <h1 className="font-serif text-headline-lg text-primary mb-2">Shopping Cart</h1>
        <p className="font-sans text-body-md text-on-surface-variant mb-12">{itemCount} items in your cart</p>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={48} className="mx-auto text-on-surface-variant mb-6" />
            <h2 className="font-serif text-headline-sm text-primary mb-4">Your cart is empty</h2>
            <p className="font-sans text-body-md text-on-surface-variant mb-8">Looks like you haven&apos;t added anything yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
