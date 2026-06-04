'use client'

import { ProductCard } from './ProductCard'
import { useProducts } from '@/lib/useProducts'
import type { Product } from '@/types'

interface RelatedProductsProps {
  currentProduct: Product
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const { products } = useProducts()
  const related = products
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <div>
      <h2 className="font-serif text-headline-sm text-primary mb-8">You May Also Like</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
