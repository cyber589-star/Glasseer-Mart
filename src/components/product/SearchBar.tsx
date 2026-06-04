'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { products } from '@/data/products'

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) setQuery('')
  }, [isOpen])

  const filtered = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className={`fixed inset-0 z-[60] transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-[30px] border-b border-outline-variant shadow-ambient">
        <div className="max-w-2xl mx-auto px-margin-mobile py-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary placeholder:text-on-surface-variant"
            />
            <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary">
              <X size={18} />
            </button>
          </div>
          {query && (
            <div className="mt-6 space-y-3 max-h-96 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="font-sans text-body-md text-on-surface-variant text-center py-8">No products found</p>
              ) : (
                filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors"
                  >
                    <div className="w-16 h-16 bg-surface-bright rounded-lg flex items-center justify-center p-3">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <p className="font-sans text-body-md text-primary">{product.name}</p>
                      <p className="font-sans text-sm text-on-surface-variant">${product.price}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
