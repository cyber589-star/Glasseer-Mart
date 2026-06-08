'use client'

import { Container, SectionHeader } from '@/components/ui'

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Our Story" subtitle="Where precision meets passion — the GlaseerMart journey." align="center" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="aspect-square bg-surface-bright rounded-3xl overflow-hidden ambient-shadow-lg flex items-center justify-center p-16">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV5F1QAMyokPONLCxe62PDuS8LmTLev_nO90QQW16-9rPJuODCKxlGiHftREa1oTg0VCe7yxJwuppfM0C_2949771BXl8WK6xGnflyV6x7thsFvaqhwlDvKEtRciY3xJ9Qu3KHt3h6VR4CMOQ9VuN7j0ZFmmj8Tjjaag88sKe2pXhrCrR54e8gf1wuXouejNzqOPX92EcM60YwU4m6Ai1l_Hs6FT5lnrxddsaFUf3Kg8tSMgzllRnfgxxpR2I7m17tDjaEi_QBd5Yf"
              alt="GlaseerMart craftsmanship"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="space-y-6">
            <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
              GlaseerMart was founded with a singular vision: to create premium eyewear that bridges the gap between avant-garde design and everyday functionality. We believe that the frames you wear should be as refined as everything else about you.
            </p>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              Every frame in our collection is the result of countless hours of design, material sourcing, and hand-finishing. We partner with master craftsmen who use techniques perfected over decades — from hand-polishing Japanese acetate to engineering titanium hinges that flex without fatigue.
            </p>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              We obsess over every detail so you don&apos;t have to. From the weight of the frame on your nose to the way light catches the temples, every element has been considered and refined.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { value: '10K+', label: 'Happy Customers' },
            { value: '200+', label: 'Premium Designs' },
            { value: '5+', label: 'Years of Excellence' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-12 bg-surface-bright rounded-2xl ambient-shadow">
              <p className="font-serif text-display-lg text-primary">{stat.value}</p>
              <p className="font-sans text-body-md text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
