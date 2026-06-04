'use client'

import { Container, SectionHeader } from '@/components/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { siteConfig } from '@/data/products'

export function SocialSection() {
  const { ref, isVisible } = useScrollReveal()

  const socialLinks = [
    {
      name: 'Instagram',
      url: siteConfig.social.instagram,
      username: '@glaseer.mart',
      color: 'hover:bg-[#E4405F]',
    },
    {
      name: 'Facebook',
      url: siteConfig.social.facebook,
      username: 'GlaseerMart',
      color: 'hover:bg-[#1877F2]',
    },
    {
      name: 'TikTok',
      url: siteConfig.social.tiktok,
      username: '@glaseer.mart',
      color: 'hover:bg-[#000000]',
    },
  ]

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white" ref={ref}>
      <Container>
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader title="Connect With Us" subtitle="Follow us on social media for style inspiration, new arrivals, and exclusive offers." align="center" />
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, i) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: `${i * 100}ms` }}
                className={`group flex items-center gap-4 px-8 py-5 bg-surface-bright rounded-2xl ambient-shadow transition-all duration-300 hover:-translate-y-1 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-white transition-colors">
                  {social.name === 'Instagram' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  )}
                  {social.name === 'Facebook' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  )}
                  {social.name === 'TikTok' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-sans text-sm text-on-surface-variant">{social.name}</p>
                  <p className="font-sans text-body-md text-primary font-medium">{social.username}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
