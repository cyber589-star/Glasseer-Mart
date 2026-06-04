'use client'

import { useState } from 'react'
import { Trash2, Mail, X, Search } from 'lucide-react'
import { subscribers as initialSubscribers } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { generateId } from '@/lib/utils'
import type { Subscriber } from '@/types'

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useLocalStorage<Subscriber[]>('admin-subscribers', initialSubscribers)
  const [search, setSearch] = useState('')

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  const deleteSubscriber = (id: string) => {
    if (confirm('Delete this subscriber?')) setSubscribers(subscribers.filter(s => s.id !== id))
  }

  const activeCount = subscribers.filter(s => s.status === 'active').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Newsletter Subscribers</h2>
        <div className="relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search emails..."
            className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Subscribers', value: subscribers.length, color: 'bg-blue-100 text-blue-700' },
          { label: 'Active', value: activeCount, color: 'bg-green-100 text-green-700' },
          { label: 'Unsubscribed', value: subscribers.length - activeCount, color: 'bg-gray-100 text-gray-700' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 ambient-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="font-sans text-sm text-on-surface-variant">{s.label}</p>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
                <Mail size={18} />
              </div>
            </div>
            <p className="font-sans text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Email</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden sm:table-cell">Subscribed Date</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(sub => (
                <tr key={sub.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-sans text-body-md text-primary">{sub.email}</td>
                  <td className="p-4 hidden sm:table-cell font-sans text-sm text-on-surface-variant">{sub.subscribedAt}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full font-sans text-xs font-medium ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {sub.status === 'active' ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteSubscriber(sub.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
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
