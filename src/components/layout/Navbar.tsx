'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, User, ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=prescription-glasses', label: 'Prescription' },
  { href: '/shop?category=sunglasses', label: 'Sunglasses' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-[30px] border-b border-black/5 shadow-sm py-3'
            : 'bg-white/70 backdrop-blur-[30px] py-4'
        )}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-primary p-2.5 hover:bg-surface-container-low/50 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="z-10 relative flex items-center">
            <Image src="/images/logo.png" alt="GlaseerMart" width={80} height={80} className="h-20 w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-label-caps text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-primary hover:bg-surface-container-low/50 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 active:scale-95"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              href="/account"
              className="text-primary hover:bg-surface-container-low/50 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 hidden md:flex"
              aria-label="Account"
            >
              <User size={20} />
            </Link>
            <Link
              href="/wishlist"
              className="text-primary hover:bg-surface-container-low/50 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-1 w-4 h-4 bg-secondary text-white text-[10px] font-sans font-semibold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="text-primary hover:bg-surface-container-low/50 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-1 w-4 h-4 bg-secondary text-white text-[10px] font-sans font-semibold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-[30px] border-b border-outline-variant animate-fade-in">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary placeholder:text-on-surface-variant"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-[72px] left-0 w-full bg-white/95 backdrop-blur-[30px] border-b border-outline-variant shadow-ambient">
            <nav className="px-margin-mobile py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-serif text-headline-sm text-primary hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-outline-variant" />
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors"
              >
                <User size={18} /> My Account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
