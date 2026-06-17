'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { products as fallbackProducts } from '@/data/products'
import { toCamel } from '@/lib/db'
import type { Product } from '@/types'

interface ProductContextValue {
  products: Product[]
  loading: boolean
}

const ProductContext = createContext<ProductContextValue>({ products: [], loading: true })

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setProducts(fallbackProducts as Product[])
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const { data, error: err } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
        if (err) throw err
        if (data) {
          setProducts(toCamel<Product[]>(data).map(p => ({ ...p, images: Array.isArray(p.images) ? p.images : [] })))
        }
      } catch (e) {
        console.error('Failed to fetch products:', e)
        setProducts(fallbackProducts as Product[])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const value = useMemo(() => ({ products, loading }), [products, loading])
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  return useContext(ProductContext)
}
