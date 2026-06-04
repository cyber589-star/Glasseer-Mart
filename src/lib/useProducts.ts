import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { products as fallbackProducts } from '@/data/products'
import type { Product } from '@/types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setProducts(fallbackProducts as Product[])
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const { data, error: err } = await supabase.from('products').select('*')
        if (err) throw err
        setProducts((data || []) as unknown as Product[])
      } catch {
        setProducts(fallbackProducts as Product[])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { products, loading, error }
}
