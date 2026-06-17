'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { useCart } from '@/context/CartContext'
import { formatPrice, generateUUID } from '@/lib/utils'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { supabase } from '@/lib/supabase'
import { toSnake } from '@/lib/db'
import Link from 'next/link'
import { ShoppingBag, CheckCircle, Truck, Upload, Camera } from 'lucide-react'
import type { Order, OrderItem } from '@/types'

const emptyOrders: Order[] = []

const singleVisionLenses = [
  { label: 'White CR Lens', price: 1500 },
  { label: 'CR MC Lens', price: 2000 },
  { label: 'Blue Cut Lens', price: 2500 },
  { label: 'Digital Lens', price: 3500 },
  { label: 'Night Drive Lens', price: 4000 },
  { label: 'All In One Lens', price: 6000 },
  { label: 'Photo Sun CR MC', price: 2500 },
  { label: 'Photo Sun Blue Cut', price: 3000 },
  { label: 'Photo Sun Drive Lens', price: 4500 },
]

const doubleVisionLenses = [
  { label: 'White CR Lens', price: 3500 },
  { label: 'CR MC Lens', price: 5500 },
  { label: 'Blue Cut Lens', price: 6500 },
  { label: 'Digital Lens', price: 9500 },
  { label: 'Night Drive Lens', price: 15000 },
  { label: 'All In One Lens', price: 22000 },
  { label: 'Photo Sun CR MC', price: 7500 },
  { label: 'Photo Sun Blue Cut', price: 8000 },
  { label: 'Photo Sun Drive Lens', price: 12000 },
]

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
  const [placing, setPlacing] = useState(false)
  const [needsPower, setNeedsPower] = useState(false)
  const [powerType, setPowerType] = useState<'single' | 'double' | ''>('')
  const [selectedLens, setSelectedLens] = useState('')
  const [prescriptionImage, setPrescriptionImage] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const activeLenses = powerType === 'double' ? doubleVisionLenses : singleVisionLenses
  const lensPrice = needsPower && selectedLens ? activeLenses.find(l => l.label === selectedLens)?.price || 0 : 0
  const deliveryCharges = items.reduce((sum, item) => sum + (item.product.shippingFee || 0) * item.quantity, 0)
  const tax = items.reduce((sum, item) => sum + item.product.price * item.quantity * ((item.product.tax || 0) / 100), 0)
  const total = subtotal + deliveryCharges + tax + lensPrice

  const validate = () => {
    const errs: Record<string, boolean> = {}
    if (!fullName.trim()) errs.fullName = true
    if (!mobileNumber.trim()) errs.mobileNumber = true
    if (!email.trim()) errs.email = true
    if (!province.trim()) errs.province = true
    if (!city.trim()) errs.city = true
    if (!address.trim()) errs.address = true
    if (needsPower && !powerType) errs.powerType = true
    if (needsPower && powerType && !selectedLens) errs.lens = true
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePowerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPrescriptionImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handlePlaceOrder = async () => {
    if (!validate()) return
    setPlacing(true)

    const trackingNumber = `GL-${generateUUID().slice(0, 8).toUpperCase()}`
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0] || '',
      price: item.product.price,
      quantity: item.quantity,
      variant: item.selectedVariant || '',
    }))

    const order: Order = {
      id: generateUUID(),
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
      date: new Date().toISOString(),
      needsPower,
      powerType: needsPower ? powerType : '',
      prescriptionImage: needsPower ? prescriptionImage : '',
      lensType: needsPower ? selectedLens : '',
      lensPrice: needsPower ? lensPrice : 0,
    }

    setOrders((prev) => [order, ...prev])

    if (supabase) {
      const { id: _, ...orderData } = toSnake(order) as any
      orderData.tracking_number = trackingNumber

      const { data: insertedOrder, error: orderError } = await supabase.from('orders').insert(orderData).select().single()

      if (orderError) {
        console.error('Order insert failed:', orderError)
      } else if (insertedOrder) {
        try {
          for (const item of orderItems) {
            await supabase.from('order_items').insert({
              order_id: insertedOrder.id,
              product_id: item.productId,
              product_name: item.productName,
              product_image: item.productImage,
              price: item.price,
              quantity: item.quantity,
              variant: item.variant || '',
            })
          }
        } catch {} // order_items table may not exist yet

        try {
          const { data: existing } = await supabase.from('customers').select('id, orders_count, total_spent').eq('email', email).maybeSingle()
          if (existing) {
            await supabase.from('customers').update({
              name: fullName, phone: mobileNumber, alt_phone: altPhone,
              orders_count: (existing.orders_count || 0) + 1,
              total_spent: (existing.total_spent || 0) + total,
            }).eq('id', existing.id)
          } else {
            await supabase.from('customers').insert({
              name: fullName, email, phone: mobileNumber, alt_phone: altPhone,
              orders_count: 1, total_spent: total, status: 'active',
            })
          }
          await supabase.from('notifications').insert({
            type: 'order', title: `New Order ${trackingNumber}`,
            message: `Order placed by ${fullName} — PKR ${total.toLocaleString()}`,
          })
        } catch {} // customers/notifications tables may not exist yet
      }
    }

    clearCart()
    setTracking(trackingNumber)
    setTotalPaid(total)
    setPlaced(true)
    setPlacing(false)
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

            <div>
              <h2 className="font-serif text-headline-sm text-primary mb-6">Glasses Power</h2>
              <p className="font-sans text-sm text-on-surface-variant mb-4">Do you need glasses power (prescription) for any of these items?</p>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => { setNeedsPower(false); setPowerType(''); setSelectedLens(''); setPrescriptionImage('') }}
                  className={`px-6 py-2.5 rounded-full border font-sans text-sm transition-all ${
                    !needsPower ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-outline-variant'
                  }`}
                >No</button>
                <button
                  onClick={() => setNeedsPower(true)}
                  className={`px-6 py-2.5 rounded-full border font-sans text-sm transition-all ${
                    needsPower ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-outline-variant'
                  }`}
                >Yes</button>
              </div>
              {needsPower && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-sans text-label-caps text-primary mb-3">Power Type <span className="text-red-500">*</span></label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setPowerType('single'); setSelectedLens(''); setErrors((p) => ({ ...p, powerType: false })) }}
                        className={`flex-1 px-5 py-3 rounded-xl border font-sans text-sm transition-all text-left ${
                          powerType === 'single' ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-outline-variant hover:border-primary'
                        }`}
                      >
                        <span className="font-medium block">Single Vision Power</span>
                        <span className={`text-xs mt-0.5 block ${powerType === 'single' ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>Standard single-focus lenses</span>
                      </button>
                      <button
                        onClick={() => { setPowerType('double'); setSelectedLens(''); setErrors((p) => ({ ...p, powerType: false })) }}
                        className={`flex-1 px-5 py-3 rounded-xl border font-sans text-sm transition-all text-left ${
                          powerType === 'double' ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-outline-variant hover:border-primary'
                        }`}
                      >
                        <span className="font-medium block">Double Vision Power</span>
                        <span className={`text-xs mt-0.5 block ${powerType === 'double' ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>Near & Distance (Bifocal/Progressive)</span>
                      </button>
                    </div>
                    {errors.powerType && <p className="font-sans text-xs text-red-500 mt-1">Please select a power type</p>}
                  </div>

                  {powerType && (
                    <div>
                      <label className="block font-sans text-label-caps text-primary mb-2">
                        Select Lens Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedLens}
                        onChange={(e) => { setSelectedLens(e.target.value); setErrors((p) => ({ ...p, lens: false })) }}
                        className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary ${errors.lens ? 'ring-2 ring-red-400' : ''}`}
                      >
                        <option value="">— Select Lens Type —</option>
                        {activeLenses.map((l) => (
                          <option key={l.label} value={l.label}>{l.label} — {formatPrice(l.price)}</option>
                        ))}
                      </select>
                      {errors.lens && <p className="font-sans text-xs text-red-500 mt-1">Please select a lens type</p>}
                    </div>
                  )}

                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                    <h3 className="font-sans text-label-caps text-amber-800 mb-3">Upload Prescription</h3>
                    <p className="font-sans text-sm text-amber-700 mb-3">Please upload your glasses power prescription so we can prepare your lenses.</p>
                    <input type="file" accept="image/*" onChange={handlePowerFile} className="hidden" ref={fileRef} />
                    <input type="file" accept="image/*" capture="environment" onChange={handlePowerFile} className="hidden" ref={cameraRef} />
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-amber-300 hover:bg-amber-100 transition-all font-sans text-sm text-amber-800">
                        <Upload size={16} /> {prescriptionImage ? 'Change Photo' : 'Upload Photo'}
                      </button>
                      <button onClick={() => cameraRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-amber-300 hover:bg-amber-100 transition-all font-sans text-sm text-amber-800">
                        <Camera size={16} /> Take Photo
                      </button>
                    </div>
                    {prescriptionImage && (
                      <div className="mt-3 flex items-center gap-3">
                        <img src={prescriptionImage} alt="Prescription" className="w-20 h-20 object-contain rounded-lg border border-amber-200 bg-white" />
                        <span className="font-sans text-xs text-green-700">Photo uploaded ✓</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
              disabled={placing}
              className="w-full px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {placing ? 'Placing Order...' : `Place Order - Pay ${formatPrice(total)} on Delivery`}
            </button>
          </div>

          <div>
            <h2 className="font-serif text-headline-sm text-primary mb-6">Order Summary</h2>
            <div className="bg-surface-bright rounded-2xl p-8 ambient-shadow space-y-4">
              {items.map((item) => {
                const itemShipping = (item.product.shippingFee || 0) * item.quantity
                const itemTax = item.product.price * item.quantity * ((item.product.tax || 0) / 100)
                return (
                  <div key={item.product.id} className="py-4 border-b border-outline-variant last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-3 flex-shrink-0 relative">
                        <Image src={item.product.images[0]} alt={item.product.name} fill sizes="64px" className="object-contain mix-blend-multiply" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-body-md text-primary truncate">{item.product.name}</p>
                        <p className="font-sans text-sm text-on-surface-variant">Qty: {item.quantity} × {formatPrice(item.product.price)}</p>
                        {item.selectedVariant && <p className="font-sans text-xs text-on-surface-variant">Size: {item.selectedVariant}</p>}
                      </div>
                      <span className="font-sans text-label-caps text-primary">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                    <div className="mt-2 ml-20 flex gap-4 font-sans text-xs text-on-surface-variant">
                      {(item.product.shippingFee || 0) > 0 && <span>Shipping: {formatPrice(item.product.shippingFee || 0)}</span>}
                      {(item.product.tax || 0) > 0 && <span>Tax ({(item.product.tax || 0)}%): {formatPrice(itemTax)}</span>}
                    </div>
                  </div>
                )
              })}
              <div className="pt-4 space-y-4 font-sans text-body-md">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="text-primary font-medium">{formatPrice(subtotal)}</span>
                </div>
                {needsPower && powerType && selectedLens && (
                  <div className="flex items-center justify-between text-secondary">
                    <span className="font-medium">
                      {powerType === 'double' ? 'Double' : 'Single'} Vision Lens: {selectedLens}
                    </span>
                    <span className="font-medium">{formatPrice(lensPrice)}</span>
                  </div>
                )}
                {deliveryCharges > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Shipping</span>
                    <span className="text-primary">{formatPrice(deliveryCharges)}</span>
                  </div>
                )}
                {tax > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Tax</span>
                    <span className="text-primary">{formatPrice(tax)}</span>
                  </div>
                )}
                <div className="border-t border-outline-variant pt-4 flex items-center justify-between">
                  <span className="text-primary font-semibold">Total</span>
                  <span className="font-serif text-headline-sm text-primary font-bold">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
