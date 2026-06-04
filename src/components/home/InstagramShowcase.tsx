'use client'

import Link from 'next/link'
import { Container, SectionHeader } from '@/components/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Instagram } from 'lucide-react'

const placeholderImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCV5F1QAMyokPONLCxe62PDuS8LmTLev_nO90QQW16-9rPJuODCKxlGiHftREa1oTg0VCe7yxJwuppfM0C_2949771BXl8WK6xGnflyV6x7thsFvaqhwlDvKEtRciY3xJ9Qu3KHt3h6VR4CMOQ9VuN7j0ZFmmj8Tjjaag88sKe2pXhrCrR54e8gf1wuXouejNzqOPX92EcM60YwU4m6Ai1l_Hs6FT5lnrxddsaFUf3Kg8tSMgzllRnfgxxpR2I7m17tDjaEi_QBd5Yf',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDP7hhJf3SO9NKeyV2LQ33ayhhBNiI6d0xQZ4C9jEpOmdshUIGmNYozf4FtJTNadTbx94l1nrR5cbcMURCpPGVu2hpuFI69i7iXv4-BpD-p7WiFQRT4trI3S6vp_4Z3dxN0rA9930yOCzAkx98DJ7U6w-xUQLQ4IcECZZOjqs_CkA034DZ1JbNenXvJYPj7h10tKAvg0A2v3cJ0lrr_S6lyj0_HMkr6Nrl8gTvEdj2w1N_Sif9oHHNX8gFV3Yv__HjEpILPEBphGkf6',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBlN0tukJnkT47xHoAvGA68BfQ8BIhIl9fSWKX6MLXqcXQvrr3RUfKpPxOugxz6dKK4HlW9mafw4PMxRzCC5lwTc0mc6xc6snWPN_VlmxkeKyFG0NS0bv8Kc6aZiv8oGQuct5eFUi9J1jm0-wbmogMwhKuKjT3GwlEVaX-rouCBJocXG-nAYz9-pGE02Oed3zWvccR8aszItcHNlFCH06R2Hsw8kF7iBZsg8h28WwsvX3BPHnz8-mJnbZMxGNtmTH7bfNxXMpVGNSGn',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDXWRhsL-jSmJpCdfLNPLpDBuKsA7lERyG0JtjKmodK-Hm8lI8u6-yfxkeWju6NlS7eNvQB-AotuhtNBxkF2msvLu4f0V2dNtZOo5deW7hVgnf58R1TtbSPP6V441iC2cK3H75BOTcQ2xQsEHtZqEsECt6a7vZsUHDZRJrn0LNSz7m3HcPdwtonf_sa_jUO-VUBZm-Xn6kOIxQOTSLqxalz3hx446NLub75j9CMUydHZXumFzhzStAoVk7ZnPaTdFWIgAvLsmgRg5kn',
]

export function InstagramShowcase() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-surface-bright" ref={ref}>
      <Container>
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            title="Follow Us on Instagram"
            subtitle="Join our community and see how our frames are styled around the world."
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {placeholderImages.map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/glaseer.mart"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-surface-container-low rounded-2xl overflow-hidden ambient-shadow hover-lift"
              >
                <img
                  src={src}
                  alt={`GlaseerMart Instagram ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-contain mix-blend-multiply p-4 md:p-6 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <Instagram size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://www.instagram.com/glaseer.mart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary"
            >
              <Instagram size={18} />
              Follow @glaseer.mart
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
