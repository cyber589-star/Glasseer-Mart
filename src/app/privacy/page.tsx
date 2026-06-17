import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { siteConfig } from '@/data/products'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'GlaseerMart privacy policy — how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-headline-lg text-primary mb-8">Privacy Policy</h1>
          <p className="font-sans text-body-md text-on-surface-variant mb-8">Last updated: January 2024</p>

          <div className="space-y-8 font-sans text-body-md text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, including your name, email address, shipping address, payment information, and phone number when you make a purchase or create an account.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to process your orders, communicate with you about your purchases, send you marketing communications (with your consent), and improve our products and services.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">3. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">4. Data Security</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">5. Cookies</h2>
              <p>We use cookies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can choose to disable cookies in your browser settings.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at {siteConfig.email} or call {siteConfig.phone}.</p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
