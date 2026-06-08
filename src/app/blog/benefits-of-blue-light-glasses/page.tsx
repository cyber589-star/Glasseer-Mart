import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Benefits of Blue Light Glasses — Protect Your Eyes in Digital Age',
  description: 'Blue light glasses reduce digital eye strain, improve sleep, and protect long-term vision. Learn the science-backed benefits and why every screen user in Pakistan needs them.',
  keywords: ['blue light glasses benefits', 'computer glasses Pakistan', 'digital eye strain', 'blue light blocking glasses', 'screen glasses'],
  openGraph: { title: 'Benefits of Blue Light Glasses | GlaseerMart', description: 'Reduce eye strain, sleep better, and protect your vision with blue light blocking glasses.' },
}

export default function BlueLightPost() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="font-sans text-sm text-secondary hover:text-primary transition-colors mb-4 inline-block">&larr; Back to Blog</Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-secondary/10 text-secondary font-sans text-[11px] font-medium rounded-full">Eye Health</span>
              <span className="px-2.5 py-1 bg-secondary/10 text-secondary font-sans text-[11px] font-medium rounded-full">Blue Light</span>
              <span className="font-sans text-xs text-on-surface-variant ml-auto">6 min read</span>
            </div>
            <h1 className="font-serif text-headline-lg text-primary mb-4">Benefits of Blue Light Glasses — Protect Your Eyes in the Digital Age</h1>
            <p className="font-sans text-body-lg text-on-surface-variant">April 2026</p>
          </div>

          <img src="https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=1200&q=80" alt="Blue light glasses benefits" className="w-full aspect-video object-cover rounded-2xl mb-10" loading="lazy" />

          <div className="font-sans text-body-md text-on-surface-variant leading-relaxed space-y-5">
            <p>In today&apos;s digital world, the average person spends over <strong>7 hours per day</strong> looking at screens — smartphones, computers, tablets, and TVs. All of these devices emit <strong>blue light</strong>, a high-energy visible (HEV) light that can affect your eyes and overall health. <strong>Blue light glasses</strong> have emerged as an essential tool for protecting your vision in the digital age. Here&apos;s everything you need to know.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">What Is Blue Light?</h2>
            <p>Blue light is part of the visible light spectrum with the shortest wavelengths and highest energy. It&apos;s naturally present in sunlight — which is why the sky looks blue. However, digital screens emit concentrated amounts of blue light at close range, and our increased screen time means our eyes are exposed to more blue light than ever before.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">1. Reduces Digital Eye Strain</h2>
            <p>Digital Eye Strain (DES), also known as Computer Vision Syndrome, affects up to <strong>70% of computer users</strong>. Symptoms include dry eyes, blurred vision, headaches, and neck pain. Blue light glasses filter out the most harmful wavelengths of blue light, reducing glare and visual stress. Users consistently report less eye fatigue and discomfort after switching to blue light blocking lenses.</p>
            <p>For professionals in Pakistan who spend hours in front of screens — whether in IT, finance, design, or remote work — blue light glasses from <strong>GlaseerMart</strong> can make a noticeable difference in daily comfort and productivity.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">2. Improves Sleep Quality</h2>
            <p>This is perhaps the most scientifically supported benefit. Blue light exposure in the evening suppresses <strong>melatonin production</strong> — the hormone that regulates your sleep-wake cycle. By wearing blue light glasses 2-3 hours before bed, you can maintain your body&apos;s natural circadian rhythm.</p>
            <p>Studies show that people who wear blue light glasses in the evening fall asleep faster, experience deeper sleep, and wake up feeling more refreshed. If you&apos;re someone who scrolls through your phone before bed (and most of us do), blue light glasses are a game-changer for your sleep health.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">3. Protects Long-Term Vision</h2>
            <p>While research is ongoing, some studies suggest that cumulative blue light exposure may contribute to <strong>age-related macular degeneration (AMD)</strong> — a leading cause of vision loss. Blue light penetrates deep into the eye, potentially damaging the retina over time.</p>
            <p>Blue light glasses act as a protective barrier, reducing your eyes&apos; lifetime exposure. While more research is needed to confirm the long-term benefits, wearing blue light protection is a low-cost, low-risk investment in your long-term eye health.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">4. Reduces Headaches and Migraines</h2>
            <p>For people prone to headaches or migraines, blue light can be a significant trigger. The flicker rate of digital screens combined with blue light exposure can strain the visual system and trigger headache episodes. Many users of blue light glasses report a significant reduction in headache frequency and intensity.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">5. Improves Visual Contrast</h2>
            <p>Blue light glasses with yellow or amber-tinted lenses can actually improve visual contrast. By filtering out blue light, these lenses enhance the contrast between objects, making text appear sharper and reducing the effort your eyes need to focus. This is particularly beneficial for reading on screens for extended periods.</p>

            <h2 className="font-serif text-headline-sm text-primary pt-4">Are Blue Light Glasses Right for You?</h2>
            <p>If you answer YES to any of these questions, blue light glasses are worth considering:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do you spend 3+ hours per day on digital devices?</li>
              <li>Do you experience eye strain, headaches, or dry eyes after screen time?</li>
              <li>Do you use your phone or tablet before bed?</li>
              <li>Do you work in front of a computer for most of your workday?</li>
              <li>Are you concerned about long-term eye health?</li>
            </ul>

            <h2 className="font-serif text-headline-sm text-primary pt-4">Blue Light Glasses at GlaseerMart</h2>
            <p>At <strong>GlaseerMart</strong>, we offer blue light blocking lenses across our entire eyewear collection. Whether you need <strong>prescription glasses</strong> with blue light protection or non-prescription computer glasses, we have options for every need. Our blue light lenses filter up to 95% of harmful blue light while maintaining natural color perception.</p>
            <p>Available with <strong>single vision, bifocal, and progressive lenses</strong>, our blue light glasses combine vision correction with digital eye protection. Shop online in Pakistan with <strong>Cash on Delivery</strong> and get your blue light glasses delivered to your doorstep.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-outline-variant text-center">
            <p className="font-sans text-body-md text-primary mb-4">Protect your eyes — shop blue light glasses at GlaseerMart</p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary">
              Shop Blue Light Glasses
            </Link>
          </div>
        </article>
      </Container>
    </div>
  )
}
