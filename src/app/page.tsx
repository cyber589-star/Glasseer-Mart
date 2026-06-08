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
  title: 'GlaseerMart Pakistan — Buy Premium Eyewear & Glasses Online with Cash on Delivery',
  description: 'Buy glasses, prescription eyewear & sunglasses online in Pakistan. Shop premium frames at the best prices with Cash on Delivery in Lahore, Karachi, Islamabad, Peshawar & nationwide. Free shipping available.',
  keywords: ['buy glasses online Pakistan', 'eyewear Pakistan', 'prescription glasses Pakistan', 'sunglasses Pakistan', 'blue light glasses Pakistan', 'GlaseerMart', 'optical shop Pakistan', 'glasses Lahore', 'sunglasses Karachi', 'eyewear Islamabad'],
  openGraph: {
    title: 'GlaseerMart Pakistan — Premium Glasses & Eyewear with Cash on Delivery',
    description: 'Shop premium glasses, prescription eyewear & sunglasses online in Pakistan. Cash on Delivery in Lahore, Karachi, Islamabad & all cities.',
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
                We deliver to <strong>Lahore, Karachi, Islamabad, Peshawar, Faisalabad, Rawalpindi, 
                Multan, Quetta, Hyderabad, Gujranwala, Sialkot</strong>, and all cities across Pakistan. 
                Whether you&apos;re in <strong>Gulberg Lahore</strong>, <strong>DHA Karachi</strong>, 
                <strong>F-7 Islamabad</strong>, or <strong>University Town Peshawar</strong>, we bring premium 
                eyewear to your doorstep.
              </p>
              <p>
                Shopping at GlaseerMart is simple: browse our collection, select your frame, choose your lens 
                type if you need prescription power, and we&apos;ll deliver with <strong>Cash on Delivery</strong> 
                anywhere in Pakistan. No hidden charges, no hassle. We also offer 
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
