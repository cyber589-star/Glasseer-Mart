import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order History',
  description: 'View your past orders and order details at GlaseerMart.',
  robots: { index: false, follow: false },
}

export default function AccountOrdersLayout({ children }: { children: React.ReactNode }) {
  return children
}
