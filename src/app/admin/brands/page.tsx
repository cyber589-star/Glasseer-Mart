'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { brands as initialBrands } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { generateId } from '@/lib/utils'
import type { Brand } from '@/types'

const emptyBrand = { id: '', name: '', slug: '', description: '', logo: '', productCount: 0 }

export default function AdminBrands() {
  const [brands, setBrands] = useLocalStorage<Brand[]>('admin-brands', initialBrands)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Brand | null>(null)
  const [form, setForm] = useState<Brand>({ ...emptyBrand, id: generateId() })

  const openAdd = () => {
    setForm({ ...emptyBrand, id: generateId() })
    setEditing(null)
    setShowModal(true)
  }

  const openEdit = (b: Brand) => {
    setForm({ ...b })
    setEditing(b)
    setShowModal(true)
  }

  const save = () => {
    if (editing) {
      setBrands(brands.map(b => b.id === form.id ? form : b))
    } else {
      setBrands([form, ...brands])
    }
    setShowModal(false)
  }

  const deleteBrand = (id: string) => {
    if (confirm('Delete this brand?')) setBrands(brands.filter(b => b.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Brands ({brands.length})</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
          <Plus size={16} /> Add Brand
        </button>
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Brand</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Description</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Products</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-bright rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                        {b.logo ? (
                          <img src={b.logo} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        ) : (
                          <span className="font-sans text-xs text-on-surface-variant font-medium">{b.name.charAt(0)}</span>
                        )}
                      </div>
                      <span className="font-sans text-body-md text-primary truncate max-w-[160px] md:max-w-[220px]">{b.name}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell"><span className="font-sans text-sm text-on-surface-variant">{b.description}</span></td>
                  <td className="p-4"><span className="font-sans text-sm text-primary font-medium">{b.productCount}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(b)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all"><Pencil size={16} /></button>
                      <button onClick={() => deleteBrand(b.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
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
              <h3 className="font-serif text-headline-sm text-primary">{editing ? 'Edit' : 'Add'} Brand</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Slug</label>
                <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Logo URL</label>
                <input value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Product Count</label>
                <input type="number" value={form.productCount} onChange={e => setForm({...form, productCount: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
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
