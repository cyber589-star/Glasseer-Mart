'use client'

import { useState } from 'react'
import { Plus, Star, Pencil, Trash2, X, Search } from 'lucide-react'
import { products as initialProducts } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { generateId } from '@/lib/utils'
import type { Product, ProductReview } from '@/types'

const emptyReview = {
  id: '', productId: '', customerName: '', rating: 5, comment: '', isFeatured: false,
  date: new Date().toISOString().split('T')[0],
}

export default function AdminReviews() {
  const [products, setProducts] = useLocalStorage<Product[]>('admin-products', initialProducts)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<{ review: ProductReview; oldProductId: string } | null>(null)
  const [form, setForm] = useState<ProductReview>({ ...emptyReview, id: generateId() })
  const [search, setSearch] = useState('')

  const allReviews = products.flatMap(p =>
    (p.reviews || []).map(r => ({ ...r, productName: p.name }))
  )

  const filtered = search
    ? allReviews.filter(r => r.customerName.toLowerCase().includes(search.toLowerCase()))
    : allReviews

  const openAdd = () => {
    setForm({ ...emptyReview, id: generateId(), productId: products[0]?.id || '' })
    setEditing(null)
    setShowModal(true)
  }

  const openEdit = (r: ProductReview & { productName?: string }) => {
    setForm({ id: r.id, productId: r.productId, customerName: r.customerName, rating: r.rating, comment: r.comment, isFeatured: r.isFeatured, date: r.date })
    setEditing({ review: { id: r.id, productId: r.productId, customerName: r.customerName, rating: r.rating, comment: r.comment, isFeatured: r.isFeatured, date: r.date }, oldProductId: r.productId })
    setShowModal(true)
  }

  const save = () => {
    if (editing) {
      setProducts(products.map(p => {
        if (p.id === editing.oldProductId && editing.oldProductId !== form.productId) {
          return { ...p, reviews: (p.reviews || []).filter(r => r.id !== form.id) }
        }
        if (p.id === form.productId) {
          const idx = (p.reviews || []).findIndex(r => r.id === form.id)
          if (idx >= 0) {
            const updated = [...p.reviews!]
            updated[idx] = form
            return { ...p, reviews: updated }
          }
          return { ...p, reviews: [...(p.reviews || []), form] }
        }
        return p
      }))
    } else {
      setProducts(products.map(p =>
        p.id === form.productId
          ? { ...p, reviews: [...(p.reviews || []), form] }
          : p
      ))
    }
    setShowModal(false)
  }

  const deleteReview = (r: ProductReview) => {
    if (confirm('Delete this review?')) {
      setProducts(products.map(p =>
        p.id === r.productId
          ? { ...p, reviews: (p.reviews || []).filter(rev => rev.id !== r.id) }
          : p
      ))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Reviews ({allReviews.length})</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
          <Plus size={16} /> Add Review
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by customer name..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary"
        />
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Customer</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden sm:table-cell">Product</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Rating</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Comment</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Featured</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-sans text-body-md text-primary">{r.customerName}</td>
                  <td className="p-4 hidden sm:table-cell font-sans text-sm text-on-surface-variant">{r.productName}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={14} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-outline-variant'} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell"><span className="font-sans text-sm text-on-surface-variant">{r.comment.length > 60 ? r.comment.slice(0, 60) + '...' : r.comment}</span></td>
                  <td className="p-4">
                    {r.isFeatured ? (
                      <span className="inline-block px-2.5 py-1 rounded-full font-sans text-xs font-medium bg-amber-100 text-amber-700">Featured</span>
                    ) : (
                      <span className="font-sans text-xs text-on-surface-variant">—</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(r)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all"><Pencil size={16} /></button>
                      <button onClick={() => deleteReview(r)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
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
              <h3 className="font-serif text-headline-sm text-primary">{editing ? 'Edit' : 'Add'} Review</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Customer Name</label>
                <input value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Product</label>
                <select value={form.productId} onChange={e => setForm({...form, productId: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Rating (1-5)</label>
                <select value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Comment</label>
                <textarea value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} className="rounded border-outline-variant text-secondary focus:ring-secondary" />
                <span className="font-sans text-sm text-primary">Featured Review</span>
              </label>
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
