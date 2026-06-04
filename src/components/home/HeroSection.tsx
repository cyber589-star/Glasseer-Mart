'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[90vh] flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect fill='%23000' width='1920' height='1080'/%3E%3C/svg%3E"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/images/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-12 md:pb-20">
        <div className="max-w-lg md:max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-label-caps tracking-[0.15em] uppercase text-white/70 mb-4 md:mb-5 block"
          >
            GlaseerMart &mdash; Premium Eyewear
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-headline-lg-mobile md:text-display-lg text-white text-balance mb-4 md:mb-5 leading-[1.05]"
          >
            See the World
            <br />
            <span className="text-amber-300">in Style</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-body-md md:text-body-lg text-white/70 mb-8 md:mb-10 max-w-md leading-relaxed"
          >
            Discover stylish prescription glasses, premium frames, and modern eyewear crafted for comfort, confidence, and everyday elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 bg-white text-black rounded-lg font-sans text-label-caps tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(255,255,255,0.2)]"
            >
              Shop Collection
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 border border-white/30 text-white rounded-lg font-sans text-label-caps tracking-wider transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
            >
              Explore Styles
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-16 md:h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </section>
  )
}
