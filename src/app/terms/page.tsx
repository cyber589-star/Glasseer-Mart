import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'GlaseerMart terms and conditions — product pricing, orders, shipping, returns, and legal information.',
}

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-headline-lg text-primary mb-8">Terms &amp; Conditions</h1>
          <p className="font-sans text-body-md text-on-surface-variant mb-8">Last updated: January 2024</p>

          <div className="space-y-8 font-sans text-body-md text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using the GlaseerMart website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">2. Products and Pricing</h2>
              <p>All products are subject to availability. We reserve the right to modify prices at any time but will honor the price confirmed at the time of order. Product images are for illustration purposes and may differ slightly from the actual product.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">3. Orders and Payment</h2>
              <p>By placing an order, you agree to provide accurate and complete information. Payment must be received in full before order processing begins. We accept major credit cards and other payment methods as displayed at checkout.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">4. Shipping and Returns</h2>
              <p>We offer free standard shipping on orders over $200. International shipping times may vary. Our 30-day return policy allows you to return unworn frames in original condition for a full refund.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">5. Intellectual Property</h2>
              <p>All content on this website, including designs, text, graphics, logos, and images, is the property of GlaseerMart and protected by applicable intellectual property laws.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">6. Limitation of Liability</h2>
              <p>GlaseerMart shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products or services.</p>
            </section>
            <section>
              <h2 className="font-serif text-headline-sm text-primary mb-4">7. Contact Information</h2>
              <p>For questions about these Terms, please contact us at umerzubair4800@gmail.com or call 0323-8284762.</p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
