'use client'

import { useState } from 'react'
import { Pencil, Trash2, X } from 'lucide-react'
import { products as initialProducts } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { truncate } from '@/lib/utils'
import type { Product } from '@/types'

const emptySEO = { metaTitle: '', metaDescription: '', keywords: '' }

export default function AdminSEO() {
  const [products, setProducts] = useLocalStorage<Product[]>('admin-products', initialProducts)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptySEO)

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm(p.seo ? { ...p.seo } : { ...emptySEO })
    setShowModal(true)
  }

  const save = () => {
    if (!editing) return
    setProducts(products.map(p =>
      p.id === editing.id ? { ...p, seo: form } : p
    ))
    setShowModal(false)
  }

  const clearSEO = (id: string) => {
    if (confirm('Clear SEO data for this product?')) {
      setProducts(products.map(p => p.id === id ? { ...p, seo: undefined } : p))
    }
  }

  const hasSEO = (p: Product) => p.seo && (p.seo.metaTitle || p.seo.metaDescription || p.seo.keywords)

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-headline-sm text-primary">SEO Management ({products.length})</h2>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Product</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Meta Title</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden lg:table-cell">Meta Description</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden sm:table-cell">Keywords</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-bright rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                        <img src={p.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <span className="font-sans text-body-md text-primary truncate max-w-[160px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell font-sans text-sm text-primary">{p.seo?.metaTitle ? truncate(p.seo.metaTitle, 40) : <span className="text-on-surface-variant/50 italic">Not set</span>}</td>
                  <td className="p-4 hidden lg:table-cell font-sans text-sm text-on-surface-variant">{p.seo?.metaDescription ? truncate(p.seo.metaDescription, 60) : <span className="text-on-surface-variant/50 italic">Not set</span>}</td>
                  <td className="p-4 hidden sm:table-cell font-sans text-sm text-on-surface-variant">{p.seo?.keywords || <span className="text-on-surface-variant/50 italic">—</span>}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all"><Pencil size={16} /></button>
                      {hasSEO(p) && (
                        <button onClick={() => clearSEO(p.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      )}
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
              <h3 className="font-serif text-headline-sm text-primary">SEO — {editing?.name}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Meta Title</label>
                <input value={form.metaTitle} onChange={e => setForm({...form, metaTitle: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Meta Description</label>
                <textarea value={form.metaDescription} onChange={e => setForm({...form, metaDescription: e.target.value})} rows={4} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Keywords (comma separated)</label>
                <input value={form.keywords} onChange={e => setForm({...form, keywords: e.target.value})} placeholder="eyewear, glasses, fashion" className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
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
