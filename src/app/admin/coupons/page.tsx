'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Percent, DollarSign } from 'lucide-react'
import { coupons as initialCoupons } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { generateId } from '@/lib/utils'
import type { Coupon } from '@/types'

const emptyCoupon: Coupon = {
  id: '', code: '', type: 'percentage', value: 0, minOrder: 0,
  usageLimit: 0, usedCount: 0, expiresAt: '', status: 'active',
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useLocalStorage<Coupon[]>('admin-coupons', initialCoupons)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Coupon | null>(null)
  const [form, setForm] = useState<Coupon>({ ...emptyCoupon, id: generateId() })

  const openAdd = () => {
    setForm({ ...emptyCoupon, id: generateId() })
    setEditing(null)
    setShowModal(true)
  }

  const openEdit = (c: Coupon) => {
    setForm({ ...c })
    setEditing(c)
    setShowModal(true)
  }

  const save = () => {
    if (editing) {
      setCoupons(coupons.map(c => c.id === form.id ? form : c))
    } else {
      setCoupons([form, ...coupons])
    }
    setShowModal(false)
  }

  const deleteCoupon = (id: string) => {
    if (confirm('Delete this coupon?')) setCoupons(coupons.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Coupons ({coupons.length})</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
          <Plus size={16} /> Add Coupon
        </button>
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Code</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Type</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Value</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Min Order</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Usage</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Expires</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-sans text-body-md text-primary font-bold">{c.code}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-sans text-xs font-medium ${c.type === 'percentage' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {c.type === 'percentage' ? <Percent size={12} /> : <DollarSign size={12} />}
                      {c.type === 'percentage' ? '%' : '$'}
                    </span>
                  </td>
                  <td className="p-4 font-sans text-sm text-primary font-medium">{c.type === 'percentage' ? `${c.value}%` : `$${c.value}`}</td>
                  <td className="p-4 hidden md:table-cell font-sans text-sm text-on-surface-variant">${c.minOrder}</td>
                  <td className="p-4 hidden md:table-cell font-sans text-sm text-on-surface-variant">{c.usedCount}/{c.usageLimit}</td>
                  <td className="p-4 hidden md:table-cell font-sans text-sm text-on-surface-variant">{c.expiresAt}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full font-sans text-xs font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700' : c.status === 'expired' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all"><Pencil size={16} /></button>
                      <button onClick={() => deleteCoupon(c.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-ambient-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-headline-sm text-primary">{editing ? 'Edit' : 'Add'} Coupon</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Code</label>
                <input value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value as 'percentage' | 'fixed'})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Value {form.type === 'percentage' ? '(%)' : '($)'}</label>
                <input type="number" value={form.value} onChange={e => setForm({...form, value: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Min Order ($)</label>
                <input type="number" value={form.minOrder} onChange={e => setForm({...form, minOrder: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Usage Limit</label>
                <input type="number" value={form.usageLimit} onChange={e => setForm({...form, usageLimit: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Expires At</label>
                <input type="date" value={form.expiresAt} onChange={e => setForm({...form, expiresAt: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value as 'active' | 'disabled'})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="flex-1 px-5 py-3 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">Save</button>
                <button onClick={() => setShowModal(false)} className="px-5 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
