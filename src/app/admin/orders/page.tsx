'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { formatPrice } from '@/lib/utils'

const statuses = ['pending', 'process', 'shipped', 'completed', 'failed'] as const

const initialOrders = [
  { id: '#1001', customer: 'Sarah Mitchell', email: 'sarah@example.com', date: '2024-06-01', items: 2, total: 640, status: 'completed' as const },
  { id: '#1002', customer: 'James Chen', email: 'james@example.com', date: '2024-06-02', items: 1, total: 380, status: 'shipped' as const },
  { id: '#1003', customer: 'Emily Rodriguez', email: 'emily@example.com', date: '2024-06-03', items: 1, total: 450, status: 'process' as const },
  { id: '#1004', customer: 'David Kim', email: 'david@example.com', date: '2024-06-04', items: 3, total: 960, status: 'pending' as const },
  { id: '#1005', customer: 'Olivia Parker', email: 'olivia@example.com', date: '2024-06-05', items: 1, total: 260, status: 'pending' as const },
  { id: '#1006', customer: 'Marcus Thompson', email: 'marcus@example.com', date: '2024-06-06', items: 2, total: 700, status: 'failed' as const },
]

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  process: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
}

export default function AdminOrders() {
  const [orders, setOrders] = useLocalStorage('admin-orders', initialOrders)

  const updateStatus = (id: string, status: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: status as any } : o))
  }

  const deleteOrder = (id: string) => {
    if (confirm('Delete this order?')) setOrders(orders.filter(o => o.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Orders ({orders.length})</h2>
        <span className="font-sans text-sm text-on-surface-variant">{orders.filter(o => o.status === 'pending').length} pending</span>
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Order</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden sm:table-cell">Customer</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Date</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Total</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-sans text-body-md text-primary font-medium">{order.id}</td>
                  <td className="p-4 hidden sm:table-cell">
                    <div>
                      <p className="font-sans text-sm text-primary">{order.customer}</p>
                      <p className="font-sans text-xs text-on-surface-variant">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell font-sans text-sm text-on-surface-variant">{order.date}</td>
                  <td className="p-4 font-sans text-sm text-primary font-medium">{formatPrice(order.total)}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-full font-sans text-xs font-medium border-0 cursor-pointer ${statusColors[order.status]}`}
                    >
                      {statuses.map(s => (
                        <option key={s} value={s} className="text-primary bg-white">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteOrder(order.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
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
