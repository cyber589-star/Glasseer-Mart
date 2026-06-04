'use client'

import { notFound, useParams } from 'next/navigation'
import { Container } from '@/components/ui'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { ProductReviews } from '@/components/product/ProductReviews'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import { useProducts } from '@/lib/useProducts'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { products, loading } = useProducts()
  const product = products.find((p) => p.slug === slug)

  if (loading) return <div className="py-24 text-center"><p className="font-sans text-body-md text-on-surface-variant">Loading...</p></div>
  if (!product) notFound()

  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          <ProductGallery images={product.images} name={product.name} galleryImages={product.galleryImages} />
          <ProductInfo product={product} />
        </div>
        <div className="mb-24">
          <ProductReviews
            reviews={product.reviews || []}
            productName={product.name}
            productId={product.id}
          />
        </div>
        <RelatedProducts currentProduct={product} />
      </Container>
    </div>
  )
}
