'use client'

import { useState } from 'react'
import { Container, SectionHeader } from '@/components/ui'
import { faqs } from '@/data/products'
import { ChevronDown } from 'lucide-react'

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Frequently Asked Questions" subtitle="Everything you need to know about GlaseerMart." align="center" />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-outline-variant rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-container-low transition-colors"
              >
                <span className="font-sans text-body-md text-primary font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-6 font-sans text-body-md text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 p-12 bg-surface-bright rounded-2xl ambient-shadow">
          <h2 className="font-serif text-headline-sm text-primary mb-4">Still Have Questions?</h2>
          <p className="font-sans text-body-md text-on-surface-variant mb-8">
            Our support team is ready to help you find the perfect frame.
          </p>
          <a
            href="tel:0323-8284762"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
          >
            Call 0323-8284762
          </a>
        </div>
      </Container>
    </div>
  )
}
