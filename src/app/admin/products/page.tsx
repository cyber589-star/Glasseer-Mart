'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { supabase, supabaseInsert, supabaseUpdate, supabaseDelete } from '@/lib/supabase'
import { toCamel } from '@/lib/db'
import type { Product } from '@/types'

const MAX_FILE_SIZE = 1.5 * 1024 * 1024
const TARGET_WIDTH = 800
const TARGET_HEIGHT = 857

async function compressImage(file: File): Promise<File> {
  if (file.size <= MAX_FILE_SIZE && file.type === 'image/webp') return file

  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = TARGET_WIDTH
  canvas.height = TARGET_HEIGHT
  const ctx = canvas.getContext('2d')!
  const scale = Math.max(TARGET_WIDTH / bitmap.width, TARGET_HEIGHT / bitmap.height)
  const sw = TARGET_WIDTH / scale
  const sh = TARGET_HEIGHT / scale
  const sx = (bitmap.width - sw) / 2
  const sy = (bitmap.height - sh) / 2
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
  bitmap.close()

  return new Promise<File>((resolve) => {
    canvas.toBlob(
      (blob) => resolve(new File([blob!], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' })),
      'image/webp',
      0.85
    )
  })
}

interface FormState {
  name: string
  slug: string
  category_id: string
  description: string
  price: number
  comparePrice: string
  shippingFee: number
  tax: number
  images: string[]
  isFeatured: boolean
  isBestSeller: boolean
  isNew: boolean
  inStock: boolean
}

const emptyForm = (): FormState => ({
  name: '',
  slug: '',
  category_id: '',
  description: '',
  price: 0,
  comparePrice: '',
  shippingFee: 0,
  tax: 0,
  images: [],
  isFeatured: false,
  isBestSeller: false,
  isNew: false,
  inStock: true,
})

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm())
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [urlInput, setUrlInput] = useState('')

  const load = async () => {
    if (!supabase) { setProducts([]); setLoading(false); return }
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(toCamel<Product[]>(data))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const uploadFile = async (file: File): Promise<string> => {
    if (!supabase) return ''
    setUploading(true)
    const compressed = await compressImage(file)
    const ext = compressed.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data } = await supabase.storage.from('product-images').upload(path, compressed)
    const url = data ? supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl : ''
    setUploading(false)
    return url
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    if (!file.type.startsWith('image/')) { setError('Only image files are allowed'); e.target.value = ''; return }
    const url = await uploadFile(file)
    if (url) setForm(prev => ({ ...prev, images: [...prev.images, url] }))
    e.target.value = ''
  }

  const addUrlImage = () => {
    const u = urlInput.trim()
    if (!u) return
    setForm(prev => ({ ...prev, images: [...prev.images, u] }))
    setUrlInput('')
  }

  const removeImage = (index: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const save = async () => {
    if (!form.name.trim()) { setError('Product name is required'); return }
    setError('')
    setSaving(true)

    const record: Record<string, any> = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, ''),
      category: form.category_id || '',
      description: form.description,
      price: form.price,
      images: form.images,
      colors: [],
      features: [],
      specs: [],
      tags: [],
      is_featured: form.isFeatured,
      is_best_seller: form.isBestSeller,
      is_new: form.isNew,
      in_stock: form.inStock,
    }
    if (form.comparePrice) record.compare_price = Number(form.comparePrice)
    if (form.shippingFee) record.shipping_fee = form.shippingFee
    if (form.tax) record.tax = form.tax
    record.is_active = true

    if (editing) {
      const result = await supabaseUpdate<Product>('products', editing.id, record)
      if (result) setProducts(prev => prev.map(p => p.id === editing.id ? toCamel<Product>(result) : p))
    } else {
      const result = await supabaseInsert<Product>('products', record)
      if (result) setProducts(prev => [toCamel<Product>(result), ...prev])
    }
    setSaving(false)
    setShowModal(false)
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await supabaseDelete('products', id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({
      name: p.name,
      slug: p.slug,
      category_id: (p as any).categoryId || p.category || '',
      description: p.description,
      price: p.price,
      comparePrice: p.comparePrice ? String(p.comparePrice) : '',
      shippingFee: p.shippingFee || 0,
      tax: p.tax || 0,
      images: p.images || [],
      isFeatured: p.isFeatured || false,
      isBestSeller: p.isBestSeller || false,
      isNew: p.isNew || false,
      inStock: p.inStock ?? true,
    })
    setShowModal(true)
  }

  const openNew = () => {
    setForm(emptyForm())
    setEditing(null)
    setShowModal(true)
  }

  const updateForm = (partial: Partial<FormState>) => setForm(prev => ({ ...prev, ...partial }))

  const renderInput = (label: string, value: string | number, onChange: (v: any) => void, type = 'text') => (
    <div>
      <label className="block font-sans text-label-caps text-primary mb-1.5">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value as string} onChange={e => onChange(e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
      ) : type === 'number' ? (
        <input type="number" value={value} onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
      )}
    </div>
  )

  if (loading) return <div className="font-sans text-body-md text-on-surface-variant">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Products ({products.length})</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Product</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Price</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Category</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden lg:table-cell">Badges</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Active</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-bright rounded-lg flex items-center justify-center p-2 flex-shrink-0 relative">
                        {p.images?.[0] ? <Image src={p.images[0]} alt={p.name} fill sizes="40px" className="object-contain mix-blend-multiply" loading="lazy" /> : <span className="font-sans text-xs text-on-surface-variant font-medium">{p.name.charAt(0)}</span>}
                      </div>
                      <span className="font-sans text-body-md text-primary truncate max-w-[160px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="font-sans text-sm text-primary font-medium">{formatPrice(p.price)}</span></td>
                  <td className="p-4 hidden md:table-cell"><span className="font-sans text-sm text-on-surface-variant capitalize">{p.category || '—'}</span></td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      {p.isFeatured && <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-sans text-[10px] font-medium">Featured</span>}
                      {p.isBestSeller && <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 font-sans text-[10px] font-medium">Best Seller</span>}
                      {p.isNew && <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-sans text-[10px] font-medium">New</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${p.isActive !== false ? 'bg-green-500' : 'bg-red-400'}`} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all"><Pencil size={16} /></button>
                      <button onClick={() => deleteProduct(p.id)} className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
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
          <div className="relative bg-white rounded-2xl shadow-ambient-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-headline-sm text-primary">{editing ? 'Edit' : 'Add'} Product</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {renderInput('Title', form.name, (v) => updateForm({ name: v, slug: v.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '') }))}
                {renderInput('Slug', form.slug, (v) => updateForm({ slug: v }))}
              </div>
              {renderInput('Description', form.description, (v) => updateForm({ description: v }), 'textarea')}

              <div className="grid grid-cols-2 gap-4">
                {renderSelect('Category', form.category_id, (v) => updateForm({ category_id: v }), [
                  { value: '', label: '— Select —' },
                  { value: 'fashion', label: 'Fashion' },
                  { value: 'sunglasses', label: 'Sunglasses' },
                  { value: 'prescription', label: 'Prescription' },
                  { value: 'computer', label: 'Computer' },
                  { value: 'premium', label: 'Premium' },
                  { value: 'sport', label: 'Sport' },
                ])}
                {renderInput('Price (PKR)', form.price, (v) => updateForm({ price: v }), 'number')}
              </div>

              {renderInput('Compare Price (PKR) - optional', form.comparePrice, (v) => updateForm({ comparePrice: v }), 'number')}

              <div>
                <label className="block font-sans text-label-caps text-primary mb-3">Product Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative w-24 h-24 bg-surface-bright rounded-xl overflow-hidden border border-outline-variant group">
                      <img src={url} alt="" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                      {i === 0 && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-primary/80 text-on-primary text-[9px] font-sans rounded">Main</span>}
                    </div>
                  ))}
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} className="w-24 h-24 flex flex-col items-center justify-center gap-1 bg-surface-container-low rounded-xl border-2 border-dashed border-outline-variant hover:border-secondary hover:bg-surface-bright transition-all cursor-pointer">
                    <Upload size={18} className="text-on-surface-variant" />
                    <span className="font-sans text-[10px] text-on-surface-variant">{uploading ? 'Uploading...' : 'Add Image'}</span>
                  </button>
                  <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" ref={fileRef} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="text" value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="Or paste image URL and add..." className="flex-1 px-4 py-2 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-sm text-primary" />
                  <button onClick={addUrlImage} disabled={!urlInput.trim()} className="px-4 py-2 bg-secondary text-white rounded-xl font-sans text-sm hover:bg-primary transition-all disabled:opacity-50">Add</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {renderInput('Shipping Fee (PKR)', form.shippingFee, (v) => updateForm({ shippingFee: v }), 'number')}
                {renderInput('Tax %', form.tax, (v) => updateForm({ tax: v }), 'number')}
              </div>

              <div>
                <label className="block font-sans text-label-caps text-primary mb-2">Badges</label>
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={e => updateForm({ isFeatured: e.target.checked })} className="rounded border-outline-variant text-secondary focus:ring-secondary" />
                    <span className="font-sans text-sm text-primary">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isBestSeller} onChange={e => updateForm({ isBestSeller: e.target.checked })} className="rounded border-outline-variant text-secondary focus:ring-secondary" />
                    <span className="font-sans text-sm text-primary">Best Seller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isNew} onChange={e => updateForm({ isNew: e.target.checked })} className="rounded border-outline-variant text-secondary focus:ring-secondary" />
                    <span className="font-sans text-sm text-primary">New Arrival</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.inStock} onChange={e => updateForm({ inStock: e.target.checked })} className="rounded border-outline-variant text-secondary focus:ring-secondary" />
                    <span className="font-sans text-sm text-primary">In Stock</span>
                  </label>
                </div>
              </div>
            </div>

            {error && <p className="mt-4 font-sans text-sm text-red-600">{error}</p>}

            <div className="flex gap-3 mt-6 pt-6 border-t border-outline-variant/50">
              <button onClick={save} disabled={saving} className="flex-1 px-5 py-3 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Product'}
              </button>
              <button onClick={() => setShowModal(false)} className="px-5 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function renderSelect(label: string, value: string, onChange: (v: string) => void, options: { value: string; label: string }[]) {
  return (
    <div>
      <label className="block font-sans text-label-caps text-primary mb-1.5">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
