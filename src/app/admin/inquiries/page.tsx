'use client'

import { useState } from 'react'
import { Mail, Eye, Check, Trash2, X } from 'lucide-react'
import { inquiries as initialInquiries } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { generateId } from '@/lib/utils'
import type { Inquiry } from '@/types'

const statusConfig = {
  new: { label: 'New', class: 'bg-blue-100 text-blue-700' },
  read: { label: 'Read', class: 'bg-gray-100 text-gray-700' },
  replied: { label: 'Replied', class: 'bg-green-100 text-green-700' },
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useLocalStorage<Inquiry[]>('admin-inquiries', initialInquiries)
  const [viewing, setViewing] = useState<Inquiry | null>(null)

  const updateStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i))
    if (viewing?.id === id) setViewing({ ...viewing, status })
  }

  const deleteInquiry = (id: string) => {
    if (confirm('Delete this inquiry?')) {
      setInquiries(inquiries.filter(i => i.id !== id))
      if (viewing?.id === id) setViewing(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Inquiries ({inquiries.length})</h2>
        <span className="font-sans text-sm text-on-surface-variant">{inquiries.filter(i => i.status === 'new').length} unread</span>
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Name</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden sm:table-cell">Email</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Subject</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden lg:table-cell">Date</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(inq => {
                const cfg = statusConfig[inq.status]
                return (
                  <tr key={inq.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {inq.status === 'new' && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                        <span className="font-sans text-body-md text-primary font-medium">{inq.name}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell font-sans text-sm text-on-surface-variant">{inq.email}</td>
                    <td className="p-4 hidden md:table-cell font-sans text-sm text-primary truncate max-w-[200px]">{inq.subject}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full font-sans text-xs font-medium ${cfg.class}`}>{cfg.label}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell font-sans text-sm text-on-surface-variant">{inq.date}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setViewing(inq)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all"><Eye size={16} /></button>
                        <button onClick={() => deleteInquiry(inq.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setViewing(null)} />
          <div className="relative bg-white rounded-2xl shadow-ambient-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-headline-sm text-primary">Inquiry Details</h3>
              <button onClick={() => setViewing(null)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-sans text-label-caps text-on-surface-variant mb-0.5">Name</p>
                  <p className="font-sans text-body-md text-primary">{viewing.name}</p>
                </div>
                <div>
                  <p className="font-sans text-label-caps text-on-surface-variant mb-0.5">Email</p>
                  <p className="font-sans text-body-md text-primary">{viewing.email}</p>
                </div>
                <div>
                  <p className="font-sans text-label-caps text-on-surface-variant mb-0.5">Phone</p>
                  <p className="font-sans text-body-md text-primary">{viewing.phone || '—'}</p>
                </div>
                <div>
                  <p className="font-sans text-label-caps text-on-surface-variant mb-0.5">Date</p>
                  <p className="font-sans text-body-md text-primary">{viewing.date}</p>
                </div>
              </div>
              <div>
                <p className="font-sans text-label-caps text-on-surface-variant mb-0.5">Subject</p>
                <p className="font-sans text-body-md text-primary">{viewing.subject}</p>
              </div>
              <div>
                <p className="font-sans text-label-caps text-on-surface-variant mb-0.5">Message</p>
                <p className="font-sans text-body-md text-primary whitespace-pre-wrap bg-surface-container-low rounded-xl p-4">{viewing.message}</p>
              </div>
              <div className="flex gap-3 pt-2">
                {viewing.status !== 'read' && (
                  <button onClick={() => updateStatus(viewing.id, 'read')} className="flex items-center justify-center gap-2 flex-1 px-4 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">
                    <Check size={16} /> Mark as Read
                  </button>
                )}
                {viewing.status !== 'replied' && (
                  <button onClick={() => updateStatus(viewing.id, 'replied')} className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-sans text-label-caps hover:bg-green-700 transition-all">
                    <Check size={16} /> Mark as Replied
                  </button>
                )}
                <button onClick={() => deleteInquiry(viewing.id)} className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-xl font-sans text-label-caps hover:bg-red-100 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
