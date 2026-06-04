'use client'

import { useState } from 'react'
import { Container } from '@/components/ui'
import { useCart } from '@/context/CartContext'
import { formatPrice, generateId } from '@/lib/utils'
import { useLocalStorage } from '@/lib/useLocalStorage'
import Link from 'next/link'
import { ShoppingBag, CheckCircle, Truck } from 'lucide-react'
import type { Order, OrderItem } from '@/types'

const emptyOrders: Order[] = []

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clearCart } = useCart()
  const [, setOrders] = useLocalStorage<Order[]>('admin-orders', emptyOrders)
  const [placed, setPlaced] = useState(false)
  const [tracking, setTracking] = useState('')
  const [totalPaid, setTotalPaid] = useState(0)

  const [fullName, setFullName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [altPhone, setAltPhone] = useState('')
  const [email, setEmail] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const deliveryCharges = subtotal > 200 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + deliveryCharges + tax

  const validate = () => {
    const errs: Record<string, boolean> = {}
    if (!fullName.trim()) errs.fullName = true
    if (!mobileNumber.trim()) errs.mobileNumber = true
    if (!email.trim()) errs.email = true
    if (!province.trim()) errs.province = true
    if (!city.trim()) errs.city = true
    if (!address.trim()) errs.address = true
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePlaceOrder = () => {
    if (!validate()) return

    const trackingNumber = `GL-${generateId().toUpperCase()}`
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0] || '',
      price: item.product.price,
      quantity: item.quantity,
      variant: item.selectedColor || item.selectedVariant,
    }))

    const order: Order = {
      id: generateId(),
      customerName: fullName,
      customerEmail: email,
      customerMobile: mobileNumber,
      customerAltPhone: altPhone,
      province,
      city,
      address,
      postalCode,
      orderNotes,
      items: orderItems,
      deliveryCharges,
      subtotal,
      total,
      status: 'pending',
      paymentMethod: 'cod',
      trackingNumber,
      date: new Date().toISOString().split('T')[0],
    }

    setOrders((prev) => [order, ...prev])
    clearCart()
    setTracking(trackingNumber)
    setTotalPaid(total)
    setPlaced(true)
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="py-16 md:py-24">
        <Container>
          <div className="text-center py-24">
            <ShoppingBag size={48} className="mx-auto text-on-surface-variant mb-6" />
            <h2 className="font-serif text-headline-sm text-primary mb-4">Your cart is empty</h2>
            <p className="font-sans text-body-md text-on-surface-variant mb-8">Add items to your cart before checking out.</p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary">
              Start Shopping
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  if (placed) {
    return (
      <div className="py-16 md:py-24">
        <Container>
          <div className="text-center py-24 max-w-md mx-auto">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
            <h2 className="font-serif text-headline-sm text-primary mb-4">Order Placed Successfully!</h2>
            <p className="font-sans text-body-md text-on-surface-variant mb-2">
              Tracking Number: <strong className="text-primary">{tracking}</strong>
            </p>
            <p className="font-sans text-body-md text-on-surface-variant mb-8">
              Total to pay on delivery: <strong>{formatPrice(totalPaid)}</strong>
            </p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary">
              Continue Shopping
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-16 md:py-24">
      <Container>
        <h1 className="font-serif text-headline-lg text-primary mb-12">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-headline-sm text-primary mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-label-caps text-primary mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: false })) }}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary ${errors.fullName ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.fullName && <p className="font-sans text-xs text-red-500 mt-1">This field is required</p>}
                </div>
                <div>
                  <label className="block font-sans text-label-caps text-primary mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => { setMobileNumber(e.target.value); setErrors((p) => ({ ...p, mobileNumber: false })) }}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary ${errors.mobileNumber ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.mobileNumber && <p className="font-sans text-xs text-red-500 mt-1">This field is required</p>}
                </div>
                <div>
                  <label className="block font-sans text-label-caps text-primary mb-2">Alternate Phone</label>
                  <input
                    type="tel"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary"
                  />
                </div>
                <div>
                  <label className="block font-sans text-label-caps text-primary mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: false })) }}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary ${errors.email ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.email && <p className="font-sans text-xs text-red-500 mt-1">This field is required</p>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-headline-sm text-primary mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-label-caps text-primary mb-2">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => { setProvince(e.target.value); setErrors((p) => ({ ...p, province: false })) }}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary ${errors.province ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.province && <p className="font-sans text-xs text-red-500 mt-1">This field is required</p>}
                </div>
                <div>
                  <label className="block font-sans text-label-caps text-primary mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => { setCity(e.target.value); setErrors((p) => ({ ...p, city: false })) }}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary ${errors.city ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.city && <p className="font-sans text-xs text-red-500 mt-1">This field is required</p>}
                </div>
                <div>
                  <label className="block font-sans text-label-caps text-primary mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: false })) }}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary ${errors.address ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.address && <p className="font-sans text-xs text-red-500 mt-1">This field is required</p>}
                </div>
                <div>
                  <label className="block font-sans text-label-caps text-primary mb-2">Postal Code (Optional)</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-headline-sm text-primary mb-6">Order Notes</h2>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none"
                placeholder="Any special instructions or notes for your order..."
              />
            </div>

            <div className="bg-secondary/5 rounded-2xl p-6 border-2 border-secondary">
              <div className="flex items-center gap-4">
                <Truck size={24} className="text-secondary" />
                <div>
                  <p className="font-sans text-body-md text-primary font-medium">Cash on Delivery</p>
                  <p className="font-sans text-sm text-on-surface-variant">Pay when you receive your order</p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
            >
              Place Order - Pay {formatPrice(total)} on Delivery
            </button>
          </div>

          <div>
            <h2 className="font-serif text-headline-sm text-primary mb-6">Order Summary</h2>
            <div className="bg-surface-bright rounded-2xl p-8 ambient-shadow space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 py-3 border-b border-outline-variant last:border-0">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-3 flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-body-md text-primary truncate">{item.product.name}</p>
                    <p className="font-sans text-sm text-on-surface-variant">Qty: {item.quantity}</p>
                    {item.selectedColor && <p className="font-sans text-xs text-on-surface-variant">Color: {item.selectedColor}</p>}
                    {item.selectedVariant && <p className="font-sans text-xs text-on-surface-variant">Size: {item.selectedVariant}</p>}
                  </div>
                  <span className="font-sans text-label-caps text-primary">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-4 space-y-3 font-sans text-body-md">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="text-primary">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Delivery Charges</span>
                  <span className="text-primary">
                    {deliveryCharges === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(deliveryCharges)
                    )}
                  </span>
                </div>
                {subtotal <= 200 && (
                  <p className="font-sans text-xs text-on-surface-variant">Free delivery on orders over {formatPrice(200)}</p>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>Tax (8%)</span>
                  <span className="text-primary">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-outline-variant pt-4 flex justify-between">
                  <span className="font-medium text-primary">Total</span>
                  <span className="font-serif text-headline-sm text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
