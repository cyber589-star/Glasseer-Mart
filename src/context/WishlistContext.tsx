'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '@/types'

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev
      return [...prev, product]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const isInWishlist = useCallback((productId: string) => {
    return items.some((item) => item.id === productId)
  }, [items])

  const itemCount = items.length

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, itemCount }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider')
  return context
}
