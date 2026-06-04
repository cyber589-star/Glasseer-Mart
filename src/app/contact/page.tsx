'use client'

import { Container, SectionHeader } from '@/components/ui'
import { siteConfig } from '@/data/products'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Get in Touch" subtitle="We&apos;d love to hear from you. Our team is here to help." align="center" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Phone, title: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                { icon: Mail, title: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: MapPin, title: 'Location', value: 'Lahore, Pakistan' },
                { icon: Clock, title: 'Support Hours', value: 'Mon-Fri, 9AM-6PM' },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-surface-bright rounded-2xl ambient-shadow">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-label-caps text-primary mb-2">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="font-sans text-body-md text-secondary hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-sans text-body-md text-on-surface-variant">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/923238284762?text=Hello%20GlaseerMart!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-[#25D366]/10 rounded-2xl ambient-shadow hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle size={24} className="text-[#25D366]" />
              <div>
                <p className="font-sans text-body-md text-primary font-medium">Chat on WhatsApp</p>
                <p className="font-sans text-sm text-on-surface-variant">Quickest way to get a response</p>
              </div>
            </a>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-2">First Name</label>
                <input type="text" className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary placeholder:text-on-surface-variant" placeholder="John" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-2">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary placeholder:text-on-surface-variant" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block font-sans text-label-caps text-primary mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary placeholder:text-on-surface-variant" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block font-sans text-label-caps text-primary mb-2">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary placeholder:text-on-surface-variant resize-none" placeholder="How can we help you?" />
            </div>
            <button type="submit" className="w-full px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary">
              Send Message
            </button>
          </form>
        </div>
      </Container>
    </div>
  )
}
