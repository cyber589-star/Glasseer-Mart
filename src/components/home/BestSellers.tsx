'use client'

import { Container, SectionHeader } from '@/components/ui'
import { ProductCard } from '@/components/product/ProductCard'
import { products } from '@/data/products'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function BestSellers() {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4)
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-surface-bright" ref={ref}>
      <Container>
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            title="Best Sellers"
            subtitle="Our most-loved frames, chosen by thousands of discerning customers worldwide."
            align="center"
          />
          <div className="grid grid-cols-2 gap-gutter">
            {bestSellers.map((product, i) => (
              <div
                key={product.id}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`${isVisible ? 'animate-fade-up' : 'opacity-0'} h-full`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
