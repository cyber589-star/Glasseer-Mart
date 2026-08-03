'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { products as fallbackProducts } from '@/data/products'
import { toCamel } from '@/lib/db'
import type { Product, ProductReview } from '@/types'

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
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
        if (productsError) throw productsError

        const reviewsByProduct = new Map<string, ProductReview[]>()
        if (productsData && productsData.length > 0) {
          const { data: reviewsData, error: reviewsError } = await supabase
            .from('reviews')
            .select('*')
            .eq('is_approved', true)
            .order('created_at', { ascending: true })
          if (!reviewsError && reviewsData) {
            reviewsData.forEach((r: any) => {
              const review: ProductReview = {
                id: r.id,
                productId: r.product_id,
                customerName: r.customer_name,
                rating: r.rating,
                comment: r.comment,
                isFeatured: r.is_featured,
                date: (r.created_at || '').slice(0, 10),
              }
              if (!reviewsByProduct.has(review.productId)) reviewsByProduct.set(review.productId, [])
              reviewsByProduct.get(review.productId)!.push(review)
            })
          }
        }

        if (productsData) {
          setProducts(toCamel<Product[]>(productsData).map(p => ({
            ...p,
            images: Array.isArray(p.images) ? p.images : [],
            reviews: reviewsByProduct.get(p.id) || [],
          })))
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
