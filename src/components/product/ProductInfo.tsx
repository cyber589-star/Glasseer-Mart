'use client'

import { useState, useRef } from 'react'
import { ShoppingBag, Heart, Upload } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice } from '@/lib/utils'
import { Rating } from '@/components/ui'
import type { Product } from '@/types'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedPower, setSelectedPower] = useState('Without Power')
  const [quantity, setQuantity] = useState(1)
  const [prescriptionImage, setPrescriptionImage] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)

  const effectivePrice = product.price
  const comparePrice = product.originalPrice

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const sizes = ['S', 'M', 'L', 'XL']
  const powers = ['Without Power', 'With Power']

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPrescriptionImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleAddToCart = () => {
    addItem(product, quantity, prescriptionImage)
  }

  return (
    <div className="space-y-8">
      <div>
        {product.isNew && (
          <span className="font-sans text-label-caps text-secondary mb-4 block">New Arrival</span>
        )}
        <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-serif text-headline-md text-primary">{formatPrice(effectivePrice)}</span>
          {comparePrice && comparePrice !== effectivePrice && (
            <span className="font-sans text-body-lg text-on-surface-variant line-through">
              {formatPrice(comparePrice)}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-1 bg-secondary/10 text-secondary font-sans text-xs rounded-full font-medium">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
        {product.description}
      </p>

      <div>
        <h3 className="font-sans text-label-caps text-primary mb-4">Size: {selectedSize}</h3>
        <div className="flex flex-wrap gap-3">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-5 py-2.5 rounded-full border font-sans text-sm transition-all duration-300 ${
                selectedSize === s ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-outline-variant hover:border-primary'
              }`}
            >{s}</button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-sans text-label-caps text-primary mb-4">Glasses Power: {selectedPower}</h3>
        <div className="flex flex-wrap gap-3">
          {powers.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPower(p)}
              className={`px-5 py-2.5 rounded-full border font-sans text-sm transition-all duration-300 ${
                selectedPower === p ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-outline-variant hover:border-primary'
              }`}
            >{p}</button>
          ))}
        </div>
      </div>

      {product.requiresPrescription && (
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
          <h3 className="font-sans text-label-caps text-amber-800 mb-3">Upload Prescription Photo</h3>
          <p className="font-sans text-sm text-amber-700 mb-3">Please upload your glasses power prescription so we can prepare your lenses.</p>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" ref={fileRef} />
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-amber-300 hover:bg-amber-100 transition-all font-sans text-sm text-amber-800">
            <Upload size={16} /> {prescriptionImage ? 'Change Photo' : 'Upload Photo'}
          </button>
          {prescriptionImage && (
            <div className="mt-3 flex items-center gap-3">
              <img src={prescriptionImage} alt="Prescription" className="w-20 h-20 object-contain rounded-lg border border-amber-200 bg-white" />
              <span className="font-sans text-xs text-green-700">Photo uploaded ✓</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-outline-variant rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 font-sans text-body-md text-primary hover:bg-surface-container-low transition-colors"
          >
            -
          </button>
          <span className="px-4 py-3 font-sans text-body-md text-primary border-x border-outline-variant min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 font-sans text-body-md text-primary hover:bg-surface-container-low transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>
        <button
          onClick={() => (wishlisted ? removeItem(product.id) : addToWishlist(product))}
          className="flex items-center justify-center gap-2 px-6 py-4 glass-panel text-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:bg-white/90"
        >
          <Heart size={18} className={wishlisted ? 'fill-secondary text-secondary' : ''} />
          {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </button>
      </div>

      <div className="border-t border-outline-variant pt-8">
        <h3 className="font-sans text-label-caps text-primary mb-4">Features</h3>
        <ul className="space-y-3">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 font-sans text-body-md text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-outline-variant pt-8">
        <h3 className="font-sans text-label-caps text-primary mb-4">Specifications</h3>
        <div className="grid grid-cols-2 gap-4">
          {product.specs.map((spec) => (
            <div key={spec.label} className="py-2">
              <p className="font-sans text-sm text-on-surface-variant">{spec.label}</p>
              <p className="font-sans text-body-md text-primary font-medium">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
