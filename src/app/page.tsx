import { HeroSection } from '@/components/home/HeroSection'
import { AllProducts } from '@/components/home/AllProducts'
import { BestSellers } from '@/components/home/BestSellers'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { CustomerReviews } from '@/components/home/CustomerReviews'
import { BrandStory } from '@/components/home/BrandStory'
import { InstagramShowcase } from '@/components/home/InstagramShowcase'
import { SocialSection } from '@/components/home/SocialSection'
import { Newsletter } from '@/components/home/Newsletter'

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
    </>
  )
}
