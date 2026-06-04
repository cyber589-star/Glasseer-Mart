'use client'

import Link from 'next/link'
import { Container } from '@/components/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function BrandStory() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden" ref={ref}>
      <Container>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="font-sans text-label-caps text-secondary mb-6 tracking-widest uppercase block">
              Our Story
            </span>
            <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary mb-8">
              Where Precision Meets Passion
            </h2>
            <div className="space-y-4 font-sans text-body-md text-on-surface-variant">
              <p>
                GlaseerMart was born from a simple belief: premium eyewear should be accessible without compromising on quality or design. We partner with master craftsmen who have spent decades perfecting their art.
              </p>
              <p>
                Every frame in our collection is a testament to our commitment to excellence. From hand-polishing Japanese acetate to engineering titanium hinges that flex without fatigue, we obsess over every detail so you don&apos;t have to.
              </p>
              <p>
                We believe that what you wear on your face should be as refined as what you wear everywhere else. It&apos;s not just about seeing better — it&apos;s about being seen.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary mt-8"
            >
              Learn More
            </Link>
          </div>
          <div className="relative aspect-square bg-surface-bright rounded-3xl overflow-hidden ambient-shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP7hhJf3SO9NKeyV2LQ33ayhhBNiI6d0xQZ4C9jEpOmdshUIGmNYozf4FtJTNadTbx94l1nrR5cbcMURCpPGVu2hpuFI69i7iXv4-BpD-p7WiFQRT4trI3S6vp_4Z3dxN0rA9930yOCzAkx98DJ7U6w-xUQLQ4IcECZZOjqs_CkA034DZ1JbNenXvJYPj7h10tKAvg0A2v3cJ0lrr_S6lyj0_HMkr6Nrl8gTvEdj2w1N_Sif9oHHNX8gFV3Yv__HjEpILPEBphGkf6"
              alt="GlaseerMart craftsmanship"
              className="absolute inset-0 w-full h-full object-contain mix-blend-multiply p-12"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
