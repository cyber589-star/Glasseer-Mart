'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react'
import { formatPrice, generateId } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { toCamel, toSnake } from '@/lib/db'
import type { Product, ProductVariant } from '@/types'

interface FormState {
  id: string
  name: string
  slug: string
  category: string
  description: string
  price: number
  comparePrice: string
  featuredImage: string
  galleryImages: string
  variants: ProductVariant[]
  isFeatured: boolean
  isBestSeller: boolean
  isNew: boolean
  createdAt: string
}

const emptyForm = (): FormState => ({
  id: generateId(),
  name: '',
  slug: '',
  category: 'fashion',
  description: '',
  price: 0,
  comparePrice: '',
  featuredImage: '',
  galleryImages: '',
  variants: [],
  isFeatured: false,
  isBestSeller: false,
  isNew: false,
  createdAt: new Date().toISOString().split('T')[0],
})

function productToForm(p: Product): FormState {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    description: p.description,
    price: p.price,
    comparePrice: p.originalPrice ? String(p.originalPrice) : '',
    featuredImage: p.images[0] || '',
    galleryImages: p.images.slice(1).join(', '),
    variants: p.variants || [],
    isFeatured: p.isFeatured || false,
    isBestSeller: p.isBestSeller || false,
    isNew: p.isNew || false,
    createdAt: p.createdAt,
  }
}

function formToProduct(form: FormState, editing: Product | null): Product {
  const images: string[] = []
  if (form.featuredImage) images.push(form.featuredImage)
  form.galleryImages.split(',').map(s => s.trim()).filter(Boolean).forEach(u => images.push(u))
  const colors = form.variants.filter(v => v.type === 'color').map(v => ({ name: v.label, hex: v.hex || '#000000' }))
  return {
    id: form.id,
    name: form.name,
    slug: form.slug,
    category: form.category,
    description: form.description,
    price: form.price,
    originalPrice: form.comparePrice ? Number(form.comparePrice) : undefined,
    images,
    variants: form.variants.filter(v => v.type && v.label && v.value),
    isFeatured: form.isFeatured,
    isBestSeller: form.isBestSeller,
    isNew: form.isNew,
    createdAt: form.createdAt,
    inStock: true,
    colors,
    rating: editing?.rating ?? 0,
    reviewCount: editing?.reviewCount ?? 0,
    features: editing?.features || [],
    specs: editing?.specs || [],
    tags: editing?.tags || [],
  }
}

const powerOptions = ['Without Power', 'With Power']

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm())
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!supabase) { setProducts([]); setLoading(false); return }
    ;(async () => {
      try { const { data } = await supabase.from('products').select('*'); if (data) setProducts(toCamel<Product[]>(data)) } catch {}
      setLoading(false)
    })()
  }, [])

  const uploadFile = async (file: File): Promise<string> => {
    if (!supabase) return ''
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data } = await supabase.storage.from('product-images').upload(path, file)
    const url = data ? supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl : ''
    setUploading(false)
    return url
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const url = await uploadFile(file)
    if (url) updateForm({ featuredImage: url })
  }

  const save = async () => {
    if (!editing) {
      const { id: _, ...rest } = formToProduct(form, null)
      if (supabase) {
        const { data } = await supabase.from('products').insert(toSnake(rest) as any).select().single()
        if (data) setProducts(prev => [toCamel<Product>(data), ...prev])
      } else {
        setProducts(prev => [rest as Product, ...prev])
      }
    } else {
      const product = formToProduct(form, editing)
      if (supabase) await supabase.from('products').update(toSnake(product) as any).eq('id', product.id)
      setProducts(prev => prev.map(p => p.id === product.id ? product : p))
    }
    setShowModal(false)
  }

  const deleteProduct = async (id: string) => {
    if (confirm('Delete this product?')) {
      if (supabase) await supabase.from('products').delete().eq('id', id)
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  const updateForm = (partial: Partial<FormState>) => setForm(prev => ({ ...prev, ...partial }))

  const addVariant = (type: 'size' | 'color' | 'power') => {
    const v: ProductVariant = type === 'color'
      ? { id: generateId(), type: 'color', label: '', value: '', hex: '#000000', inStock: true }
      : type === 'power'
        ? { id: generateId(), type: 'power', label: 'Without Power', value: 'Without Power', inStock: true }
        : { id: generateId(), type: 'size', label: '', value: '', inStock: true }
    updateForm({ variants: [...form.variants, v] })
  }

  const updateVariant = (i: number, v: ProductVariant) => {
    const variants = [...form.variants]; variants[i] = v; updateForm({ variants })
  }

  const removeVariant = (i: number) => updateForm({ variants: form.variants.filter((_, idx) => idx !== i) })

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

  const renderSelect = (label: string, value: string, onChange: (v: string) => void, options: { value: string; label: string }[]) => (
    <div>
      <label className="block font-sans text-label-caps text-primary mb-1.5">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )

  if (loading) return <div className="font-sans text-body-md text-on-surface-variant">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Products ({products.length})</h2>
        <button onClick={() => { setForm(emptyForm()); setEditing(null); setShowModal(true) }} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
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
                <th className="p-4 font-sans text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-bright rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                        {p.images[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" /> : <span className="font-sans text-xs text-on-surface-variant font-medium">{p.name.charAt(0)}</span>}
                      </div>
                      <span className="font-sans text-body-md text-primary truncate max-w-[160px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="font-sans text-sm text-primary font-medium">{formatPrice(p.price)}</span></td>
                  <td className="p-4 hidden md:table-cell"><span className="font-sans text-sm text-on-surface-variant capitalize">{p.category}</span></td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      {p.isFeatured && <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-sans text-[10px] font-medium">Featured</span>}
                      {p.isBestSeller && <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 font-sans text-[10px] font-medium">Best Seller</span>}
                      {p.isNew && <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-sans text-[10px] font-medium">New</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setForm(productToForm(p)); setEditing(p); setShowModal(true) }} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all"><Pencil size={16} /></button>
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
                {renderSelect('Category', form.category, (v) => updateForm({ category: v }), [
                  { value: 'fashion', label: 'Fashion' },
                  { value: 'prescription', label: 'Prescription' },
                  { value: 'sunglasses', label: 'Sunglasses' },
                  { value: 'computer', label: 'Computer' },
                  { value: 'premium', label: 'Premium' },
                  { value: 'sport', label: 'Sport' },
                  { value: 'men', label: 'Men' },
                  { value: 'women', label: 'Women' },
                ])}
                {renderInput('Price (PKR)', form.price, (v) => updateForm({ price: v }), 'number')}
              </div>

              {renderInput('Compare Price (PKR) - optional', form.comparePrice, (v) => updateForm({ comparePrice: v }), 'number')}

              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Featured Image</label>
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" ref={fileRef} />
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant hover:bg-surface-bright transition-all font-sans text-sm text-primary">
                    <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                  {renderInput('Or image URL', form.featuredImage, (v) => updateForm({ featuredImage: v }))}
                </div>
                {form.featuredImage && (
                  <div className="mt-2 w-24 h-24 bg-surface-bright rounded-xl overflow-hidden border border-outline-variant">
                    <img src={form.featuredImage} alt="" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  </div>
                )}
              </div>

              {renderInput('More Images (comma-separated URLs)', form.galleryImages, (v) => updateForm({ galleryImages: v }))}

              <div className="space-y-3">
                <label className="block font-sans text-label-caps text-primary">Colors</label>
                {form.variants.filter(v => v.type === 'color').map((v, i) => {
                  const realIdx = form.variants.findIndex(x => x.id === v.id)
                  return (
                    <div key={v.id} className="flex items-center gap-2">
                      <input value={v.label} onChange={e => updateVariant(realIdx, { ...v, label: e.target.value })} placeholder="Color name" className="flex-1 px-3 py-2 bg-surface-container-low rounded-lg border-0 focus:ring-2 focus:ring-secondary font-sans text-sm text-primary" />
                      <input type="color" value={v.hex || '#000000'} onChange={e => updateVariant(realIdx, { ...v, hex: e.target.value })} className="w-10 h-10 rounded-lg border-0 cursor-pointer" />
                      <button onClick={() => removeVariant(realIdx)} className="p-2 text-on-surface-variant hover:text-red-600"><X size={16} /></button>
                    </div>
                  )
                })}
                <button onClick={() => addVariant('color')} className="text-sm text-secondary hover:underline font-sans">+ Add Color</button>
              </div>

              <div className="space-y-3">
                <label className="block font-sans text-label-caps text-primary">Sizes</label>
                {form.variants.filter(v => v.type === 'size').map((v, i) => {
                  const realIdx = form.variants.findIndex(x => x.id === v.id)
                  return (
                    <div key={v.id} className="flex items-center gap-2">
                      <input value={v.label} onChange={e => updateVariant(realIdx, { ...v, label: e.target.value })} placeholder="e.g. Small, Medium, Large" className="flex-1 px-3 py-2 bg-surface-container-low rounded-lg border-0 focus:ring-2 focus:ring-secondary font-sans text-sm text-primary" />
                      <input value={v.value} onChange={e => updateVariant(realIdx, { ...v, value: e.target.value })} placeholder="e.g. S, M, L" className="w-24 px-3 py-2 bg-surface-container-low rounded-lg border-0 focus:ring-2 focus:ring-secondary font-sans text-sm text-primary" />
                      <button onClick={() => removeVariant(realIdx)} className="p-2 text-on-surface-variant hover:text-red-600"><X size={16} /></button>
                    </div>
                  )
                })}
                <button onClick={() => addVariant('size')} className="text-sm text-secondary hover:underline font-sans">+ Add Size</button>
              </div>

              <div className="space-y-3">
                <label className="block font-sans text-label-caps text-primary">Glasses Power Options</label>
                <p className="font-sans text-xs text-on-surface-variant -mt-2">Customer can select any power when ordering. Add the powers you want to offer below:</p>
                {form.variants.filter(v => v.type === 'power').map((v, i) => {
                  const realIdx = form.variants.findIndex(x => x.id === v.id)
                  return (
                    <div key={v.id} className="flex items-center gap-2">
                      <select value={v.label} onChange={e => updateVariant(realIdx, { ...v, label: e.target.value, value: e.target.value === 'No Power (0.00)' ? '0.00' : e.target.value.replace('+', '').replace('-', '') })} className="flex-1 px-3 py-2 bg-surface-container-low rounded-lg border-0 focus:ring-2 focus:ring-secondary font-sans text-sm text-primary">
                        {powerOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <button onClick={() => removeVariant(realIdx)} className="p-2 text-on-surface-variant hover:text-red-600"><X size={16} /></button>
                    </div>
                  )
                })}
                <button onClick={() => addVariant('power')} className="text-sm text-secondary hover:underline font-sans">+ Add Power Option</button>
              </div>

              <div>
                <label className="block font-sans text-label-caps text-primary mb-2">Badges</label>
                <div className="flex items-center gap-6">
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
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-outline-variant/50">
              <button onClick={save} className="flex-1 px-5 py-3 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">Save Product</button>
              <button onClick={() => setShowModal(false)} className="px-5 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
