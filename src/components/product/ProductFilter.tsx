'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCategories } from '@/lib/useCategories'

export function ProductFilter() {
  const { categories } = useCategories()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  const handleCategoryClick = (slug: string | null) => {
    if (slug) {
      router.push(`/shop?category=${slug}`)
    } else {
      router.push('/shop')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-sans text-label-caps text-primary mb-6">Categories</h3>
        <div className="space-y-3">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`block w-full text-left font-sans text-body-md transition-colors ${
              !activeCategory ? 'text-primary font-medium' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`block w-full text-left font-sans text-body-md transition-colors ${
                activeCategory === cat.slug ? 'text-primary font-medium' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {cat.name}
              <span className="text-sm text-on-surface-variant ml-2">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-outline-variant pt-8">
        <h3 className="font-sans text-label-caps text-primary mb-6">Price Range</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Min"
            className="w-24 px-3 py-2 border border-outline-variant rounded-lg font-sans text-sm text-primary bg-transparent focus:border-secondary focus:ring-1 focus:ring-secondary"
          />
          <span className="text-on-surface-variant">-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-24 px-3 py-2 border border-outline-variant rounded-lg font-sans text-sm text-primary bg-transparent focus:border-secondary focus:ring-1 focus:ring-secondary"
          />
        </div>
      </div>

      <div className="border-t border-outline-variant pt-8">
        <h3 className="font-sans text-label-caps text-primary mb-6">Tags</h3>
        <div className="flex flex-wrap gap-3">
          {['New Arrivals', 'Best Sellers', 'Sale', 'Premium'].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 bg-surface-container-low rounded-full font-sans text-sm text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
