'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { categories as initialCategories } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { generateId } from '@/lib/utils'
import type { Category } from '@/types'

export default function AdminCategories() {
  const [categories, setCategories] = useLocalStorage<Category[]>('admin-categories', initialCategories)
  const [modal, setModal] = useState<{ open: boolean; editing?: Category }>({ open: false })
  const [form, setForm] = useState({ name: '', description: '', image: '', count: 0 })

  const openAdd = () => {
    setForm({ name: '', description: '', image: '', count: 0 })
    setModal({ open: true })
  }

  const openEdit = (cat: Category) => {
    setForm({ name: cat.name, description: cat.description, image: cat.image, count: cat.count })
    setModal({ open: true, editing: cat })
  }

  const closeModal = () => setModal({ open: false })

  const save = () => {
    if (!form.name.trim()) return
    if (modal.editing) {
      setCategories(categories.map(c =>
        c.id === modal.editing!.id
          ? { ...c, name: form.name, description: form.description, image: form.image, count: form.count }
          : c
      ))
    } else {
      const newCat: Category = {
        id: generateId(),
        name: form.name,
        slug: form.name.toLowerCase().replace(/\s+/g, '-'),
        description: form.description,
        image: form.image,
        count: form.count,
      }
      setCategories([...categories, newCat])
    }
    closeModal()
  }

  const deleteCategory = (id: string) => {
    if (confirm('Delete this category?')) setCategories(categories.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Categories ({categories.length})</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-sans text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl ambient-shadow overflow-hidden group">
            <div className="aspect-[4/3] bg-surface-container-high overflow-hidden relative">
              <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-sans text-label-caps text-primary">{cat.name}</h3>
                <span className="shrink-0 font-sans text-xs text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">{cat.count} products</span>
              </div>
              <p className="font-sans text-sm text-on-surface-variant line-clamp-2">{cat.description}</p>
              <div className="flex gap-1 pt-1">
                <button onClick={() => openEdit(cat)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-all">
                  <Pencil size={15} />
                </button>
                <button onClick={() => deleteCategory(cat.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={closeModal}>
          <div className="bg-white rounded-2xl ambient-shadow w-full max-w-md mx-4 p-6 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-headline-sm text-primary">{modal.editing ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={closeModal} className="p-2 text-on-surface-variant hover:text-primary rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-on-surface-variant mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-sans text-sm text-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-on-surface-variant mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-sans text-sm text-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="Short description"
                />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-on-surface-variant mb-1.5">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-sans text-sm text-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-on-surface-variant mb-1.5">Product Count</label>
                <input
                  type="number"
                  value={form.count}
                  onChange={e => setForm({ ...form, count: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-sans text-sm text-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  min={0}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={closeModal} className="flex-1 px-4 py-2.5 border border-outline-variant rounded-xl font-sans text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl font-sans text-sm font-medium hover:bg-primary/90 transition-colors">{modal.editing ? 'Save Changes' : 'Add Category'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
