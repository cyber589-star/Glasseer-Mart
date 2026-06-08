import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with GlaseerMart. Our team is here to help with orders, inquiries, and eyewear questions.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
