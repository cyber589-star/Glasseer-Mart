'use client'

import { useState } from 'react'
import { Search, Package, AlertTriangle, CheckCircle, XCircle, Pencil, X } from 'lucide-react'
import { products as initialProducts } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

const statusConfig = {
  in_stock: { label: 'In Stock', class: 'bg-green-100 text-green-700' },
  low_stock: { label: 'Low Stock', class: 'bg-amber-100 text-amber-700' },
  out_of_stock: { label: 'Out of Stock', class: 'bg-red-100 text-red-700' },
}

export default function AdminInventory() {
  const [products, setProducts] = useLocalStorage<Product[]>('admin-products', initialProducts)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState({ stockQuantity: 0, lowStockAlert: 5, inventoryStatus: 'in_stock' as Product['inventoryStatus'] })

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku || '').toLowerCase().includes(search.toLowerCase())
  )

  const total = products.length
  const inStock = products.filter(p => p.inventoryStatus === 'in_stock' || (!p.inventoryStatus && p.inStock)).length
  const lowStock = products.filter(p => p.inventoryStatus === 'low_stock').length
  const outOfStock = products.filter(p => p.inventoryStatus === 'out_of_stock' || (!p.inventoryStatus && !p.inStock)).length

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({
      stockQuantity: p.stockQuantity ?? 0,
      lowStockAlert: p.lowStockAlert ?? 5,
      inventoryStatus: p.inventoryStatus ?? (p.inStock ? 'in_stock' : 'out_of_stock'),
    })
    setShowModal(true)
  }

  const save = () => {
    if (!editing) return
    setProducts(products.map(p =>
      p.id === editing.id ? { ...p, stockQuantity: form.stockQuantity, lowStockAlert: form.lowStockAlert, inventoryStatus: form.inventoryStatus } : p
    ))
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Inventory Management</h2>
        <div className="relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: total, icon: Package, color: 'bg-blue-100 text-blue-700' },
          { label: 'In Stock', value: inStock, icon: CheckCircle, color: 'bg-green-100 text-green-700' },
          { label: 'Low Stock', value: lowStock, icon: AlertTriangle, color: 'bg-amber-100 text-amber-700' },
          { label: 'Out of Stock', value: outOfStock, icon: XCircle, color: 'bg-red-100 text-red-700' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 ambient-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="font-sans text-sm text-on-surface-variant">{s.label}</p>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={18} />
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
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Product</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden sm:table-cell">SKU</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Stock Qty</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Low Alert</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Status</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const status = p.inventoryStatus ?? (p.inStock ? 'in_stock' : 'out_of_stock')
                const config = statusConfig[status]
                return (
                  <tr key={p.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-surface-bright rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                          <img src={p.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <span className="font-sans text-body-md text-primary truncate max-w-[180px]">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell font-sans text-sm text-on-surface-variant">{p.sku || '—'}</td>
                    <td className="p-4 font-sans text-sm text-primary font-medium">{p.stockQuantity ?? '—'}</td>
                    <td className="p-4 hidden md:table-cell font-sans text-sm text-on-surface-variant">{p.lowStockAlert ?? 5}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full font-sans text-xs font-medium ${config.class}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(p)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all">
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-ambient-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-headline-sm text-primary">{editing?.name}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Stock Quantity</label>
                <input type="number" value={form.stockQuantity} onChange={e => setForm({...form, stockQuantity: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Low Stock Alert Threshold</label>
                <input type="number" value={form.lowStockAlert} onChange={e => setForm({...form, lowStockAlert: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Inventory Status</label>
                <select value={form.inventoryStatus} onChange={e => setForm({...form, inventoryStatus: e.target.value as Product['inventoryStatus']})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
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
