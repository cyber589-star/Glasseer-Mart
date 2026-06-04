'use client'

import { Container } from '@/components/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ArrowRight } from 'lucide-react'

export function Newsletter() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-surface-bright" ref={ref}>
      <Container>
        <div className={`max-w-2xl mx-auto text-center transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-sans text-label-caps text-secondary mb-6 tracking-widest uppercase block">
            Stay Connected
          </span>
          <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary mb-6">
            Join Our Inner Circle
          </h2>
          <p className="font-sans text-body-lg text-on-surface-variant mb-10 max-w-md mx-auto">
            Subscribe to receive exclusive access to new collections, limited editions, and members-only pricing.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white rounded-lg border border-outline-variant font-sans text-body-md text-primary placeholder:text-on-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
            >
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}
