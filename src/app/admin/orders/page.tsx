'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { toCamel, toSnake } from '@/lib/db'

const statuses = ['pending', 'processing', 'shipped', 'completed', 'failed', 'cancelled'] as const
const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    if (!supabase) return
    supabase.from('orders').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setOrders(toCamel<any[]>(data))
    })
  }, [])

  const updateStatus = async (id: string, status: string) => {
    if (supabase) await supabase.from('orders').update(toSnake({ status }) as any).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Delete order?')) return
    if (supabase) await supabase.from('orders').delete().eq('id', id)
    setOrders(prev => prev.filter(o => o.id !== id))
  }

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-headline-sm text-primary">Orders ({orders.length})</h2>
      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Order</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Customer</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Date</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Total</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-outline-variant/50">
                  <td className="p-4 font-sans text-sm text-primary font-medium">{o.trackingNumber || o.id?.slice(0, 8)}</td>
                  <td className="p-4 hidden md:table-cell"><span className="font-sans text-sm text-on-surface-variant">{o.customerName}</span></td>
                  <td className="p-4 hidden md:table-cell"><span className="font-sans text-sm text-on-surface-variant">{o.date || o.createdAt?.slice(0, 10)}</span></td>
                  <td className="p-4 font-sans text-sm text-primary font-medium">{formatPrice(o.total)}</td>
                  <td className="p-4">
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} className={`px-2.5 py-1 rounded-full font-sans text-xs font-medium border-0 ${statusColors[o.status] || 'bg-gray-100 text-gray-800'}`}>
                      {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteOrder(o.id)} className="p-2 text-on-surface-variant hover:text-red-600 rounded-lg transition-all"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
