'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Search, Mail, Phone, MapPin } from 'lucide-react'
import { customers as initialCustomers } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { formatPrice, generateId } from '@/lib/utils'
import type { Customer } from '@/types'

const emptyCustomer = {
  id: '', name: '', email: '', phone: '', altPhone: '',
  province: '', city: '', address: '',
  orders: 0, totalSpent: 0, status: 'active' as const,
  joinedDate: new Date().toISOString().split('T')[0],
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('admin-customers', initialCustomers)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Customer | null>(null)
  const [form, setForm] = useState<Customer>({ ...emptyCustomer, id: generateId() })

  const filtered = customers.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  const openAdd = () => {
    setForm({ ...emptyCustomer, id: generateId() })
    setEditing(null)
    setShowModal(true)
  }

  const openEdit = (c: Customer) => {
    setForm({ ...c })
    setEditing(c)
    setShowModal(true)
  }

  const save = () => {
    if (editing) {
      setCustomers(customers.map(c => c.id === form.id ? form : c))
    } else {
      setCustomers([form, ...customers])
    }
    setShowModal(false)
  }

  const deleteCustomer = (id: string) => {
    if (confirm('Delete this customer?')) setCustomers(customers.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Customers ({customers.length})</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
          <Plus size={16} /> Add Customer
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or phone..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-outline-variant focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary placeholder:text-on-surface-variant/50 ambient-shadow"
        />
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Customer</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Phone</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden lg:table-cell">Location</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden sm:table-cell">Orders</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden sm:table-cell">Total Spent</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div>
                      <span className="font-sans text-body-md text-primary font-medium">{c.name}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Mail size={12} className="text-on-surface-variant" />
                        <span className="font-sans text-xs text-on-surface-variant truncate max-w-[160px]">{c.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Phone size={12} className="text-on-surface-variant" />
                      <span className="font-sans text-sm text-on-surface-variant">{c.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-on-surface-variant" />
                      <span className="font-sans text-sm text-on-surface-variant">{c.city}, {c.province}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell"><span className="font-sans text-sm text-primary">{c.orders}</span></td>
                  <td className="p-4 hidden sm:table-cell"><span className="font-sans text-sm text-primary font-medium">{formatPrice(c.totalSpent)}</span></td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full font-sans text-xs font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {c.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all"><Pencil size={16} /></button>
                      <button onClick={() => deleteCustomer(c.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
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
              <h3 className="font-serif text-headline-sm text-primary">{editing ? 'Edit' : 'Add'} Customer</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Phone</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Alt Phone</label>
                <input value={form.altPhone} onChange={e => setForm({...form, altPhone: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Province</label>
                <input value={form.province} onChange={e => setForm({...form, province: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">City</label>
                <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Address</label>
                <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value as 'active' | 'inactive'})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
