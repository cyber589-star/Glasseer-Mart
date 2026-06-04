'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionHeader } from '@/components/ui'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/lib/useProducts'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function AllProducts() {
  const { products } = useProducts()
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white" ref={ref}>
      <Container>
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            title="All Products"
            subtitle="Every frame in our collection, crafted for the discerning eye."
          />
          <div className="grid grid-cols-2 gap-gutter">
            {products.map((product, i) => (
              <div
                key={product.id}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`${isVisible ? 'animate-fade-up' : 'opacity-0'} h-full`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-sans text-label-caps text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors group"
            >
              View All Pieces
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
