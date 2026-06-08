import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { AllProducts } from '@/components/home/AllProducts'
import { BestSellers } from '@/components/home/BestSellers'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { CustomerReviews } from '@/components/home/CustomerReviews'
import { BrandStory } from '@/components/home/BrandStory'
import { InstagramShowcase } from '@/components/home/InstagramShowcase'
import { SocialSection } from '@/components/home/SocialSection'
import { Newsletter } from '@/components/home/Newsletter'

export const metadata: Metadata = {
  title: 'GlaseerMart Pakistan — Buy Premium Eyewear & Glasses Online',
  description: 'Shop premium glasses, eyewear & sunglasses online in Pakistan. Buy prescription glasses, blue light glasses, and fashion frames with Cash on Delivery.',
  keywords: ['buy glasses online Pakistan', 'eyewear Pakistan', 'prescription glasses', 'sunglasses Pakistan', 'blue light glasses', 'GlaseerMart', 'optical shop Pakistan'],
  openGraph: {
    title: 'GlaseerMart Pakistan — Premium Eyewear & Glasses Online',
    description: 'Shop premium glasses, prescription eyewear & sunglasses in Pakistan. Cash on Delivery nationwide.',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AllProducts />
      <BestSellers />
      <WhyChooseUs />
      <CustomerReviews />
      <BrandStory />
      <InstagramShowcase />
      <SocialSection />
      <Newsletter />
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-headline-md text-primary mb-6">Premium Eyewear in Pakistan — Quality Glasses at Your Doorstep</h2>
            <div className="font-sans text-body-md text-on-surface-variant leading-relaxed space-y-4 text-left">
              <p>
                Welcome to <strong>GlaseerMart</strong>, Pakistan&apos;s premier destination for premium eyewear. 
                Whether you&apos;re looking for <strong>prescription glasses</strong>, <strong>fashion frames</strong>, 
                or high-quality <strong>sunglasses</strong>, our curated collection brings you the best in optical 
                fashion. We understand that buying glasses online in Pakistan requires trust — which is why every 
                frame we offer is handpicked for quality, comfort, and style.
              </p>
              <p>
                Our range includes <strong>blue light blocking glasses</strong> for digital eye strain, 
                <strong>computer glasses</strong> for professionals, <strong>prescription eyewear</strong> with 
                various lens options including single vision and progressive bifocals, and trendy 
                <strong>fashion sunglasses</strong>. Each pair is crafted using premium materials like Japanese 
                acetate and titanium for durability and all-day comfort.
              </p>
              <p>
                Shopping at GlaseerMart is simple: browse our collection, select your frame, choose your lens 
                type if you need prescription power, and we&apos;ll deliver to your doorstep anywhere in Pakistan 
                with <strong>Cash on Delivery</strong>. No hidden charges, no hassle. We also offer 
                <strong>free shipping</strong> on select orders and a satisfaction guarantee on every purchase.
              </p>
              <p>
                Whether you need glasses for reading, driving, computer work, or making a fashion statement, 
                GlaseerMart has the perfect pair waiting for you. <strong>Shop online in Pakistan</strong> today 
                and experience the difference that premium eyewear makes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
