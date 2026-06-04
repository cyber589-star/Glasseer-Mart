'use client'

import { Container } from '@/components/ui'
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <h1 className="font-serif text-headline-lg text-primary mb-12">My Account</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: User, title: 'Profile', desc: 'Manage your personal information', href: '#' },
            { icon: Package, title: 'Orders', desc: 'View your order history', href: '/account/orders' },
            { icon: Heart, title: 'Wishlist', desc: 'View your saved items', href: '/wishlist' },
            { icon: MapPin, title: 'Addresses', desc: 'Manage shipping addresses', href: '#' },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="p-8 bg-surface-bright rounded-2xl ambient-shadow hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                <item.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-serif text-headline-sm text-primary mb-2">{item.title}</h3>
              <p className="font-sans text-body-md text-on-surface-variant">{item.desc}</p>
            </Link>
          ))}
          <button className="p-8 bg-surface-bright rounded-2xl ambient-shadow hover:-translate-y-1 transition-all duration-300 text-left">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
              <LogOut size={22} className="text-red-500" />
            </div>
            <h3 className="font-serif text-headline-sm text-primary mb-2">Sign Out</h3>
            <p className="font-sans text-body-md text-on-surface-variant">Log out of your account</p>
          </button>
        </div>
      </Container>
    </div>
  )
}
