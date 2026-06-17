'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function SpecialProduct() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden" ref={ref}>
      <Container>
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-sans text-label-caps text-secondary mb-6 tracking-widest uppercase block text-center">
            Special Product
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mt-4">
            <div className="relative aspect-[3/4] bg-surface-bright rounded-3xl overflow-hidden ambient-shadow-lg">
              <Image
                src="/images/Capturejjjjj.PNG"
                alt="Mahira — Special Edition"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
                Mahira
              </h2>
              <p className="font-sans text-label-caps text-secondary mb-6 tracking-widest uppercase">
                Special Edition
              </p>
              <div className="space-y-4 font-sans text-body-md text-on-surface-variant">
                <p>
                  Meet <strong>Mahira</strong> — a truly special frame crafted for those who refuse to blend in. Inspired by timeless elegance and modern sophistication, this exclusive design features hand-polished Japanese acetate with a rich tortoiseshell finish that catches the light from every angle.
                </p>
                <p>
                  Every detail of Mahira has been meticulously considered: the gentle cat-eye contour that flatters every face shape, the premium titanium hinges engineered for decades of smooth operation, and the anti-reflective lenses that provide crystal-clear vision in any light.
                </p>
                <p>
                  This isn&apos;t just a pair of glasses — it&apos;s a statement. Whether you&apos;re heading to a business meeting in Lahore, a dinner date in Karachi, or a casual outing in Islamabad, Mahira elevates every look with effortless grace.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
                >
                  Shop Now
                </Link>
                <span className="font-sans text-label-caps text-on-surface-variant">Limited Edition</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
