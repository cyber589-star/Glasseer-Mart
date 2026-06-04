'use client'

import { Container } from '@/components/ui'
import { Package } from 'lucide-react'
import Link from 'next/link'

const sampleOrders = [
  { id: '#1001', date: 'Mar 15, 2024', status: 'Delivered', total: 320, items: 1 },
  { id: '#1002', date: 'Feb 28, 2024', status: 'Shipped', total: 680, items: 1 },
]

export default function OrdersPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <Link href="/account" className="font-sans text-label-caps text-secondary hover:text-primary transition-colors mb-8 inline-block">
          &larr; Back to Account
        </Link>
        <h1 className="font-serif text-headline-lg text-primary mb-2">My Orders</h1>
        <p className="font-sans text-body-md text-on-surface-variant mb-12">Track and manage your orders.</p>

        {sampleOrders.length === 0 ? (
          <div className="text-center py-24">
            <Package size={48} className="mx-auto text-on-surface-variant mb-6" />
            <h2 className="font-serif text-headline-sm text-primary mb-4">No orders yet</h2>
            <p className="font-sans text-body-md text-on-surface-variant mb-8">Place your first order and it will appear here.</p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sampleOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-6 bg-surface-bright rounded-2xl ambient-shadow">
                <div>
                  <p className="font-sans text-body-md text-primary font-medium">{order.id}</p>
                  <p className="font-sans text-sm text-on-surface-variant">{order.date} &middot; {order.items} item(s)</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full font-sans text-label-caps ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                  <p className="font-sans text-label-caps text-primary mt-1">${order.total}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
