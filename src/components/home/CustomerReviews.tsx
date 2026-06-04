'use client'

import { Container, SectionHeader } from '@/components/ui'
import { testimonials } from '@/data/products'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Star } from 'lucide-react'

export function CustomerReviews() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-surface-bright" ref={ref}>
      <Container>
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader title="What Our Customers Say" subtitle="Real stories from our community of style-conscious individuals." align="center" />
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`flex-shrink-0 w-[85vw] sm:w-[400px] p-8 bg-white rounded-2xl ambient-shadow snap-start ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={j < testimonial.rating ? 'fill-secondary text-secondary' : 'fill-surface-container-high text-surface-container-high'}
                    />
                  ))}
                </div>
                <p className="font-sans text-body-md text-on-surface-variant mb-6 leading-relaxed">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-sm text-primary font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-primary font-medium">{testimonial.name}</p>
                    <p className="font-sans text-xs text-on-surface-variant">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
