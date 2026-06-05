'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

export function CartSummary() {
  const { items, subtotal, itemCount } = useCart()
  const deliveryCharges = items.reduce((sum, item) => sum + (item.product.shippingFee || 0) * item.quantity, 0)
  const tax = items.reduce((sum, item) => sum + item.product.price * item.quantity * ((item.product.tax || 0) / 100), 0)
  const total = subtotal + deliveryCharges + tax

  return (
    <div className="bg-surface-bright rounded-2xl p-8 ambient-shadow">
      <h3 className="font-serif text-headline-sm text-primary mb-6">Order Summary</h3>
      <div className="space-y-4 font-sans text-body-md">
        {items.map(item => (
          <div key={item.product.id} className="flex justify-between text-sm text-on-surface-variant border-b border-outline-variant/30 pb-2">
            <span className="truncate max-w-[200px]">{item.product.name} x{item.quantity}</span>
            <span className="text-primary">{formatPrice(item.product.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3 font-sans text-body-md">
        <div className="flex justify-between text-on-surface-variant">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span className="text-primary">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-on-surface-variant">
          <span>Shipping</span>
          <span className={deliveryCharges === 0 ? 'text-green-600 font-medium' : 'text-primary'}>
            {deliveryCharges === 0 ? 'Free' : formatPrice(deliveryCharges)}
          </span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between text-on-surface-variant">
            <span>Tax</span>
            <span className="text-primary">{formatPrice(tax)}</span>
          </div>
        )}
        <div className="border-t border-outline-variant pt-4 flex justify-between">
          <span className="font-medium text-primary">Total</span>
          <span className="font-serif text-headline-sm text-primary">{formatPrice(total)}</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className="mt-8 block w-full text-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
      >
        Proceed to Checkout
      </Link>
      <Link
        href="/shop"
        className="mt-4 block w-full text-center px-8 py-4 glass-panel text-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:bg-white/90"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
