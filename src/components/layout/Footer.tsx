'use client'

import Link from 'next/link'
import { Container } from '@/components/ui'
import { siteConfig } from '@/data/products'

const footerLinks = {
  explore: [
    { href: '/shop', label: 'All Products' },
    { href: '/shop?category=new-arrivals', label: 'New Arrivals' },
    { href: '/shop?category=best-sellers', label: 'Best Sellers' },
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
  ],
  categories: [
    { href: '/shop?category=prescription-glasses', label: 'Prescription Glasses' },
    { href: '/shop?category=sunglasses', label: 'Sunglasses' },
    { href: '/shop?category=fashion-glasses', label: 'Fashion Glasses' },
    { href: '/shop?category=computer-glasses', label: 'Computer Glasses' },
  ],
  support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant">
      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-6 block">
              <img src="/images/logo.png" alt="GlaseerMart" className="h-16 w-auto" />
            </Link>
            <p className="font-sans text-body-md text-on-surface-variant mb-6 max-w-sm">
              Premium optical and stylish glasses crafted for the discerning eye. Each frame is a statement of elegance and precision.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-label-caps text-primary mb-6 font-bold">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-body-md text-on-surface-variant hover:text-secondary transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-label-caps text-primary mb-6 font-bold">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-body-md text-on-surface-variant hover:text-secondary transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-label-caps text-primary mb-6 font-bold">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-body-md text-on-surface-variant hover:text-secondary transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="font-sans text-label-caps text-primary mb-4 font-bold">Contact</h4>
              <p className="font-sans text-body-md text-on-surface-variant mb-1">{siteConfig.phone}</p>
              <p className="font-sans text-body-md text-on-surface-variant">{siteConfig.email}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant mt-12 md:mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} GlaseerMart. All rights reserved.
          </p>
          <p className="font-sans text-sm text-on-surface-variant">
            Crafted for the discerning eye.
          </p>
        </div>
      </Container>
    </footer>
  )
}
