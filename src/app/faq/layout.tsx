import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about ordering, shipping, returns, and eyewear care at GlaseerMart.',
  openGraph: { title: 'FAQ | GlaseerMart', description: 'Find answers about ordering, shipping, returns, and eyewear care.' },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
