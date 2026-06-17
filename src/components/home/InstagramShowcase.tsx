'use client'

import Image from 'next/image'
import { Container, SectionHeader } from '@/components/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Instagram } from 'lucide-react'

const placeholderImages = [
  '/images/zkzb.PNG',
  '/images/Untitle.png',
  '/images/q.png',
  '/images/ffg.PNG',
]

export function InstagramShowcase() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-surface-bright" ref={ref}>
      <Container>
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            title="Follow Us on Instagram"
            subtitle="Join our community and see how our frames are styled around the world."
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {placeholderImages.map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/glaseer.mart"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-surface-container-low rounded-2xl overflow-hidden ambient-shadow hover-lift"
              >
                <Image
                  src={src}
                  alt={`GlaseerMart Instagram ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain mix-blend-multiply p-4 md:p-6 transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <Instagram size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://www.instagram.com/glaseer.mart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
            >
              <Instagram size={18} />
              Follow @glaseer.mart
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
