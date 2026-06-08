import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'How to Choose Glasses for Your Face Shape — Complete Guide',
  description: 'Learn which frame shapes complement oval, round, square, heart, and diamond face shapes. Expert guide to finding glasses that fit your face perfectly from GlaseerMart Pakistan.',
  keywords: ['glasses for face shape', 'face shape glasses guide', 'choose glasses online Pakistan', 'frame shape guide'],
  openGraph: { title: 'How to Choose Glasses for Your Face Shape | GlaseerMart', description: 'Expert guide to finding the perfect frames for oval, round, square, heart, and diamond face shapes.' },
}

export default function FaceShapePost() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="font-sans text-sm text-secondary hover:text-primary transition-colors mb-4 inline-block">&larr; Back to Blog</Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-secondary/10 text-secondary font-sans text-[11px] font-medium rounded-full">Style Guide</span>
              <span className="px-2.5 py-1 bg-secondary/10 text-secondary font-sans text-[11px] font-medium rounded-full">Shopping Tips</span>
              <span className="font-sans text-xs text-on-surface-variant ml-auto">7 min read</span>
            </div>
            <h1 className="font-serif text-headline-lg text-primary mb-4">How to Choose Glasses for Your Face Shape</h1>
            <p className="font-sans text-body-lg text-on-surface-variant">May 2026</p>
          </div>

          <img src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=1200&q=80" alt="Choosing glasses for face shape" className="w-full aspect-video object-cover rounded-2xl mb-10" loading="lazy" />

          <div className="font-sans text-body-md text-on-surface-variant leading-relaxed space-y-5">
            <p>Finding the perfect pair of glasses isn&apos;t just about style — it&apos;s about finding frames that complement your <strong>face shape</strong>. The right frames can enhance your best features, create balance, and boost your confidence. In this comprehensive guide, we&apos;ll help you identify your face shape and choose frames that look amazing on you.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">How to Determine Your Face Shape</h2>
            <p>Stand in front of a mirror and pull your hair back. Using a washable marker or lipstick, trace the outline of your face on the mirror. Step back and look at the shape you&apos;ve drawn. Which category does it most closely match? Here&apos;s how to identify each face shape:</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">1. Oval Face Shape</h2>
            <p><strong>Characteristics:</strong> Balanced proportions, slightly wider cheekbones, gentle taper from forehead to chin.</p>
            <p><strong>Best frames:</strong> Lucky you — oval faces can pull off almost any frame shape. Geometric, square, rectangular, cat-eye, and aviator styles all work beautifully. The key is to choose frames that are as wide as (or slightly wider than) the widest part of your face.</p>
            <p><strong>Avoid:</strong> Frames that are too large or too small for your face. Oversized frames can overwhelm an oval face, while very small frames can look disproportionate.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">2. Round Face Shape</h2>
            <p><strong>Characteristics:</strong> Full cheeks, curved lines, width and length roughly equal.</p>
            <p><strong>Best frames:</strong> Angular and geometric frames help add structure and definition. Rectangular, square, and cat-eye frames create the illusion of length and balance the soft curves of a round face. Wayfarer and browline styles are also excellent choices.</p>
            <p><strong>Avoid:</strong> Round frames — they emphasize the roundness of your face. Also avoid very small frames that get lost on your face.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">3. Square Face Shape</h2>
            <p><strong>Characteristics:</strong> Strong jawline, broad forehead, angular features with similar width across the face.</p>
            <p><strong>Best frames:</strong> Soften angular features with round, oval, or cat-eye frames. Butterfly and aviator styles also work well. Look for frames with curved lines and decorative details at the temples to draw attention outward.</p>
            <p><strong>Avoid:</strong> Sharp angular frames that mirror your face&apos;s strong angles. Rectangular and square frames can make a square face look too harsh.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">4. Heart Face Shape</h2>
            <p><strong>Characteristics:</strong> Broad forehead, high cheekbones, narrow chin. Often considered the most versatile face shape for glasses.</p>
            <p><strong>Best frames:</strong> Bottom-heavy frames, cat-eye, round, and oval shapes balance a wider forehead. Rimless frames and light-colored frames also work beautifully. Look for frames with detailing on the lower half or temples.</p>
            <p><strong>Avoid:</strong> Top-heavy frames and oversized square shapes that emphasize the forehead.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">5. Diamond Face Shape</h2>
            <p><strong>Characteristics:</strong> High cheekbones, narrow forehead, narrow chin. The rarest face shape.</p>
            <p><strong>Best frames:</strong> Oval, cat-eye, and rimless frames highlight your cheekbones while softening your forehead. Frames with distinctive brow lines or decorative temples work beautifully. Look for frames that are wider than your cheekbones.</p>
            <p><strong>Avoid:</strong> Narrow frames and boxy shapes that make your face look too angular.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">6. Rectangle / Oblong Face Shape</h2>
            <p><strong>Characteristics:</strong> Longer than wide, with straight cheek lines and a long nose.</p>
            <p><strong>Best frames:</strong> Oversized frames, round frames, and cat-eye styles add width and break up the length of your face. Decorative temples and bold colors draw attention outward. Frames with a low bridge can also help shorten the appearance of your nose.</p>
            <p><strong>Avoid:</strong> Small, narrow frames that emphasize length.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">Find Your Perfect Frames at GlaseerMart</h2>
            <p>Now that you know your face shape, it&apos;s time to find frames that fit. At <strong>GlaseerMart</strong>, we offer a wide selection of <strong>premium eyewear in Pakistan</strong> with styles for every face shape. Shop our collection online with <strong>Cash on Delivery</strong> and free shipping on select orders.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-outline-variant text-center">
            <p className="font-sans text-body-md text-primary mb-4">Browse frames for your face shape at GlaseerMart</p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary">
              Shop Frames
            </Link>
          </div>
        </article>
      </Container>
    </div>
  )
}
