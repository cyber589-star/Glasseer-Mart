'use client'

import { Container, SectionHeader } from '@/components/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Eye, Award, Shield, Truck, RotateCcw, Headphones } from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: 'Premium Materials',
    description: 'Japanese acetate, titanium, and hand-polished finishes for unmatched quality.',
  },
  {
    icon: Award,
    title: 'Expert Craftsmanship',
    description: 'Each frame is meticulously crafted by master artisans with decades of experience.',
  },
  {
    icon: Shield,
    title: '2-Year Warranty',
    description: 'All frames come with our comprehensive warranty against manufacturing defects.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary shipping on all orders over $200, with express options available.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Not in love? Return your frames within 30 days for a full refund, no questions asked.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Our team of optical specialists is here to help you find your perfect fit.',
  },
]

export function WhyChooseUs() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white" ref={ref}>
      <Container>
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader title="Why Choose GlaseerMart" subtitle="We redefine what premium eyewear means." align="center" />
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`flex-shrink-0 w-[85vw] sm:w-[350px] p-8 rounded-2xl bg-surface-bright ambient-shadow snap-start ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              >
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-serif text-headline-sm text-primary mb-3">{feature.title}</h3>
                <p className="font-sans text-body-md text-on-surface-variant">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
