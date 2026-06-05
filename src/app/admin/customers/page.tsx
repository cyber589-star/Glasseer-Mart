'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toCamel } from '@/lib/db'
import { formatPrice } from '@/lib/utils'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    ;(async () => {
      const { data } = await supabase.from('customers').select('*').order('created_at', { ascending: false })
      if (data) setCustomers(toCamel<any[]>(data))
      setLoading(false)
    })()
  }, [])

  if (loading) return <div className="font-sans text-body-md text-on-surface-variant">Loading...</div>

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-headline-sm text-primary">Customers ({customers.length})</h2>
      {customers.length === 0 ? (
        <div className="bg-white rounded-2xl ambient-shadow p-12 text-center">
          <p className="font-sans text-body-md text-on-surface-variant">No customers yet. Customers are created when orders are placed.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="p-4 font-sans text-label-caps text-on-surface-variant">Name</th>
                  <th className="p-4 font-sans text-label-caps text-on-surface-variant">Email</th>
                  <th className="p-4 font-sans text-label-caps text-on-surface-variant">Phone</th>
                  <th className="p-4 font-sans text-label-caps text-on-surface-variant">Orders</th>
                  <th className="p-4 font-sans text-label-caps text-on-surface-variant">Total Spent</th>
                  <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                  <th className="p-4 font-sans text-label-caps text-on-surface-variant">Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 font-sans text-sm text-primary font-medium">{c.name}</td>
                    <td className="p-4 font-sans text-sm text-on-surface-variant">{c.email || '—'}</td>
                    <td className="p-4 font-sans text-sm text-on-surface-variant">{c.phone || '—'}</td>
                    <td className="p-4 font-sans text-sm text-primary">{c.ordersCount || 0}</td>
                    <td className="p-4 font-sans text-sm text-primary font-medium">{formatPrice(c.totalSpent || 0)}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full font-sans text-xs font-medium ${
                        c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>{c.status || 'active'}</span>
                    </td>
                    <td className="p-4 font-sans text-sm text-on-surface-variant">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
