'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container, SectionHeader } from '@/components/ui'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilter } from '@/components/product/ProductFilter'
import { useProducts } from '@/lib/useProducts'
import { useCategories } from '@/lib/useCategories'

function ShopContent() {
  const searchParams = useSearchParams()
  const { products, loading } = useProducts()
  const { categories } = useCategories()
  const categorySlug = searchParams.get('category')

  const filtered = categorySlug
    ? products.filter((p) => {
        const cat = categories.find((c) => c.slug === categorySlug)
        return cat ? p.category === cat.id : true
      })
    : products

  const categoryName = categorySlug
    ? categories.find((c) => c.slug === categorySlug)?.name || 'Shop'
    : 'All Products'

  if (loading) return <Container><div className="text-center py-24"><p className="font-sans text-body-md text-on-surface-variant">Loading...</p></div></Container>

  return (
    <Container>
      <SectionHeader title={categoryName} subtitle="Discover frames that define your style." />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1">
          <ProductFilter />
        </aside>
        <div className="lg:col-span-3">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </Container>
  )
}

export default function ShopPage() {
  return (
    <div className="py-16 md:py-24">
      <Suspense fallback={<Container><div className="text-center py-24"><p className="font-sans text-body-md text-on-surface-variant">Loading...</p></div></Container>}>
        <ShopContent />
      </Suspense>
    </div>
  )
}
