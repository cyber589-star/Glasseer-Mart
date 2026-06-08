import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eyewear Blog',
  description: 'Read the latest eyewear trends, style guides, and tips from GlaseerMart. Learn how to choose glasses, benefits of blue light lenses, and more.',
  openGraph: { title: 'Eyewear Blog | GlaseerMart', description: 'Style guides, trends, and tips for premium eyewear.' },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
