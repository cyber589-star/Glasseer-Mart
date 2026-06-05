import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { products as fallbackProducts } from '@/data/products'
import { toCamel } from '@/lib/db'
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
        const { data, error: err } = await supabase
          .from('products')
          .select('*, product_images(url, alt, sort_order)')
          .order('created_at', { ascending: false })
        if (err) throw err
        if (data) {
          const mapped = toCamel<Product[]>(data).map(p => ({
            ...p,
            images: Array.isArray(p.images) ? p.images : [],
          }))
          setProducts(mapped)
        }
      } catch (e) {
        console.error('Failed to fetch products:', e)
        setProducts(fallbackProducts as Product[])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { products, loading, error }
}
