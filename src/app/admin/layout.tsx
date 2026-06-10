'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Package, Tags, ShoppingCart, BarChart3, Menu, X, LogOut, Lock,
  Users, Percent, Star, Search, Image, FileText, MessageSquare, Mail, BookOpen,
  Eye, EyeOff
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ADMIN_PASSWORD = 'umerzubair4800!'

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: BookOpen },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: Percent },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pageTitle = useMemo(() => {
    const match = sidebarLinks.find(l => l.href !== '/admin' && pathname.startsWith(l.href))
    return match?.label || (pathname === '/admin' ? 'Dashboard' : 'Admin')
  }, [pathname])
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    setAuthenticated(localStorage.getItem('admin-auth') === 'true')
    const keep = ['admin-products', 'admin-auth']
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('admin-') && !keep.includes(key)) {
        localStorage.removeItem(key)
      }
    }
    const emptyKeys = ['admin-orders', 'admin-coupons', 'admin-brands', 'admin-inquiries', 'admin-newsletter', 'admin-media', 'admin-content', 'admin-seo', 'admin-categories', 'admin-customers', 'admin-inventory', 'admin-analytics']
    emptyKeys.forEach(k => { if (!localStorage.getItem(k)) localStorage.setItem(k, '[]') })
  }, [])

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin-auth', 'true')
      setAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const logout = () => {
    localStorage.removeItem('admin-auth')
    setAuthenticated(false)
  }

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-ambient-xl w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-secondary" />
            </div>
            <h1 className="font-serif text-headline-sm text-primary mb-2">Admin Access</h1>
            <p className="font-sans text-body-md text-on-surface-variant">Enter password to continue</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary placeholder:text-on-surface-variant/50"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="font-sans text-sm text-red-600">{error}</p>}
            <button onClick={login} className="w-full px-5 py-3 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex">
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-outline-variant transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-outline-variant flex items-center justify-between">
            <Link href="/admin" className="font-serif text-headline-sm text-primary">Admin Panel</Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-primary p-1">
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl font-sans text-body-md transition-all',
                    active
                      ? 'bg-secondary text-white font-medium'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  )}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-outline-variant space-y-1">
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-red-600 transition-all w-full">
              <LogOut size={20} />
              Logout
            </button>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all">
              <LogOut size={20} />
              Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-outline-variant px-3 md:px-6 py-3 flex items-center gap-2 md:gap-4 min-w-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-primary p-2 flex-shrink-0 hover:bg-surface-container-low rounded-xl transition-colors">
            <Menu size={22} />
          </button>
          <h1 className="font-serif text-headline-sm text-primary flex-1 truncate min-w-0">{pageTitle}</h1>
          <Link href="/" className="font-sans text-label-caps text-secondary hover:text-primary transition-colors flex-shrink-0 whitespace-nowrap">
            View Site
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
