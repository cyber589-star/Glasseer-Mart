'use client'

import { useState, useEffect } from 'react'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'
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
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) return
    supabase.from('orders').select('*').order('date', { ascending: false }).then(({ data }) => {
      if (data) setOrders(toCamel<any[]>(data))
    })
  }, [])

  const updateStatus = async (id: string, status: string) => {
    if (supabase) await supabase.from('orders').update(toSnake({ status }) as any).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Delete this order?')) return
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
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">#</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Customer</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Contact</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Date</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Total</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <>
                  <tr key={o.id} className="border-b border-outline-variant/50 hover:bg-surface/50 cursor-pointer" onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
                    <td className="p-4 font-sans text-sm text-primary font-medium flex items-center gap-1">
                      {expanded === o.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {o.trackingNumber || o.id?.slice(0, 8)}
                    </td>
                    <td className="p-4 font-sans text-sm text-primary">{o.customerName || 'N/A'}</td>
                    <td className="p-4 font-sans text-sm text-on-surface-variant">
                      <div>{o.customerEmail || 'N/A'}</div>
                      <div className="text-xs">{o.customerMobile || ''}</div>
                    </td>
                    <td className="p-4 font-sans text-sm text-on-surface-variant">{o.date ? o.date.slice(0, 10) : 'N/A'}</td>
                    <td className="p-4 font-sans text-sm text-primary font-medium">{formatPrice(o.total)}</td>
                    <td className="p-4">
                      <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full font-sans text-xs font-medium border-0 cursor-pointer ${statusColors[o.status] || 'bg-gray-100 text-gray-800'}`}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); deleteOrder(o.id) }}
                        className="p-2 text-on-surface-variant hover:text-red-600 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                  {expanded === o.id && (
                    <tr key={`${o.id}-details`}>
                      <td colSpan={7} className="p-4 bg-surface/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-sans text-label-caps text-primary mb-2">Customer Details</h4>
                            <div className="font-sans text-sm text-on-surface-variant space-y-1">
                              <p><span className="text-primary">Name:</span> {o.customerName}</p>
                              <p><span className="text-primary">Email:</span> {o.customerEmail}</p>
                              <p><span className="text-primary">Mobile:</span> {o.customerMobile}</p>
                              {o.customerAltPhone && <p><span className="text-primary">Alt Phone:</span> {o.customerAltPhone}</p>}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-sans text-label-caps text-primary mb-2">Shipping Address</h4>
                            <div className="font-sans text-sm text-on-surface-variant space-y-1">
                              <p>{o.address}</p>
                              <p>{o.city}, {o.province}</p>
                              <p>Postal Code: {o.postalCode}</p>
                              {o.orderNotes && <p className="mt-2"><span className="text-primary">Notes:</span> {o.orderNotes}</p>}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-sans text-label-caps text-primary mb-2">Order Items</h4>
                            <div className="font-sans text-sm text-on-surface-variant space-y-1">
                              {(o.items || []).map((item: any, i: number) => (
                                <p key={i}>{item.productName} x{item.quantity} — {formatPrice(item.price * item.quantity)}</p>
                              ))}
                              <hr className="my-1 border-outline-variant/50" />
                              <p><span className="text-primary">Subtotal:</span> {formatPrice(o.subtotal)}</p>
                              <p><span className="text-primary">Delivery:</span> {formatPrice(o.deliveryCharges || 0)}</p>
                              <p className="text-primary font-medium">Total: {formatPrice(o.total)}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
