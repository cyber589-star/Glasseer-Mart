'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, ChevronDown } from 'lucide-react'
import { products as initialProducts } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { formatPrice, generateId } from '@/lib/utils'
import type { Product, ProductVariant, SpecItem, ProductReview, SEO } from '@/types'

const defaultSpecs: SpecItem[] = [
  { label: 'Frame Material', value: '' },
  { label: 'Lens Material', value: '' },
  { label: 'Lens Width', value: '' },
  { label: 'Bridge Width', value: '' },
  { label: 'Temple Length', value: '' },
  { label: 'Weight', value: '' },
  { label: 'Frame Shape', value: '' },
  { label: 'Frame Type', value: '' },
  { label: 'UV Protection', value: '' },
  { label: 'Prescription Support', value: '' },
]

interface FormState {
  id: string
  name: string
  slug: string
  sku: string
  brand: string
  category: string
  subcategory: string
  shortDescription: string
  description: string
  tags: string
  status: 'draft' | 'published'
  costPrice: number
  price: number
  salePrice: string
  discountPercentage: number
  stockQuantity: number
  lowStockAlert: number
  inventoryStatus: 'in_stock' | 'low_stock' | 'out_of_stock'
  featuredImage: string
  galleryImages: string
  variants: ProductVariant[]
  specs: SpecItem[]
  metaTitle: string
  metaDescription: string
  keywords: string
  isFeatured: boolean
  isBestSeller: boolean
  isNew: boolean
  createdAt: string
}

const emptyForm = (): FormState => ({
  id: generateId(),
  name: '',
  slug: '',
  sku: '',
  brand: '',
  category: 'fashion',
  subcategory: '',
  shortDescription: '',
  description: '',
  tags: '',
  status: 'draft',
  costPrice: 0,
  price: 0,
  salePrice: '',
  discountPercentage: 0,
  stockQuantity: 0,
  lowStockAlert: 5,
  inventoryStatus: 'in_stock',
  featuredImage: '',
  galleryImages: '',
  variants: [],
  specs: defaultSpecs.map(s => ({ ...s })),
  metaTitle: '',
  metaDescription: '',
  keywords: '',
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
    sku: p.sku || '',
    brand: p.brand || '',
    category: p.category,
    subcategory: p.subcategory || '',
    shortDescription: p.shortDescription || '',
    description: p.description,
    tags: (p.tags || []).join(', '),
    status: p.status || 'published',
    costPrice: p.costPrice || 0,
    price: p.price,
    salePrice: p.salePrice != null ? String(p.salePrice) : '',
    discountPercentage: p.discountPercentage || 0,
    stockQuantity: p.stockQuantity || 0,
    lowStockAlert: p.lowStockAlert || 5,
    inventoryStatus: p.inventoryStatus || (p.inStock ? 'in_stock' : 'out_of_stock'),
    featuredImage: p.featuredImage || p.images[0] || '',
    galleryImages: (p.galleryImages || p.images.slice(1) || []).join(', '),
    variants: p.variants || [],
    specs: p.specs && p.specs.length > 0 ? p.specs.map(s => ({ ...s })) : defaultSpecs.map(s => ({ ...s })),
    metaTitle: p.seo?.metaTitle || '',
    metaDescription: p.seo?.metaDescription || '',
    keywords: p.seo?.keywords || '',
    isFeatured: p.isFeatured || false,
    isBestSeller: p.isBestSeller || false,
    isNew: p.isNew || false,
    createdAt: p.createdAt,
  }
}

function formToProduct(form: FormState, editing: Product | null): Product {
  const galleryArray = form.galleryImages ? form.galleryImages.split(',').map(s => s.trim()).filter(Boolean) : []
  const imagesArray: string[] = []
  if (form.featuredImage) imagesArray.push(form.featuredImage)
  imagesArray.push(...galleryArray)

  const tagsArray = form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : []

  const salePriceNum = form.salePrice ? parseFloat(form.salePrice) : 0
  let discountPct = form.discountPercentage
  if (discountPct <= 0 && form.price > 0 && salePriceNum > 0 && salePriceNum < form.price) {
    discountPct = Math.round(((form.price - salePriceNum) / form.price) * 100)
  }

  const validVariants = form.variants.filter(v => v.type && v.label && v.value)

  return {
    id: form.id,
    name: form.name,
    slug: form.slug,
    sku: form.sku || undefined,
    brand: form.brand || undefined,
    category: form.category,
    subcategory: form.subcategory || undefined,
    shortDescription: form.shortDescription || undefined,
    description: form.description,
    costPrice: form.costPrice > 0 ? form.costPrice : undefined,
    price: form.price,
    salePrice: salePriceNum > 0 ? salePriceNum : undefined,
    discountPercentage: discountPct > 0 ? discountPct : undefined,
    stockQuantity: form.stockQuantity > 0 ? form.stockQuantity : undefined,
    lowStockAlert: form.lowStockAlert > 0 ? form.lowStockAlert : undefined,
    inventoryStatus: form.inventoryStatus,
    featuredImage: form.featuredImage || undefined,
    galleryImages: galleryArray.length > 0 ? galleryArray : undefined,
    variants: validVariants.length > 0 ? validVariants : undefined,
    specs: form.specs.filter(s => s.label || s.value),
    features: editing?.features || [],
    tags: tagsArray,
    status: form.status,
    isFeatured: form.isFeatured,
    isBestSeller: form.isBestSeller,
    isNew: form.isNew,
    rating: editing?.rating ?? 0,
    reviewCount: editing?.reviewCount ?? 0,
    reviews: editing?.reviews,
    seo: (form.metaTitle || form.metaDescription || form.keywords)
      ? { metaTitle: form.metaTitle, metaDescription: form.metaDescription, keywords: form.keywords }
      : undefined,
    createdAt: form.createdAt,
    images: imagesArray,
    colors: editing?.colors || [],
    inStock: form.inventoryStatus === 'in_stock',
    originalPrice: editing?.originalPrice,
  }
}

const tabs = ['basic', 'pricing', 'inventory', 'images', 'variants', 'specs', 'seo'] as const
type Tab = typeof tabs[number]
const tabLabels: Record<Tab, string> = {
  basic: 'Basic Information',
  pricing: 'Pricing',
  inventory: 'Inventory',
  images: 'Images',
  variants: 'Variants',
  specs: 'Specifications',
  seo: 'SEO',
}

export default function AdminProducts() {
  const [products, setProducts] = useLocalStorage<Product[]>('admin-products', initialProducts)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm())
  const [activeTab, setActiveTab] = useState<Tab>('basic')

  const openAdd = () => {
    setForm(emptyForm())
    setEditing(null)
    setActiveTab('basic')
    setShowModal(true)
  }

  const openEdit = (p: Product) => {
    setForm(productToForm(p))
    setEditing(p)
    setActiveTab('basic')
    setShowModal(true)
  }

  const save = () => {
    const product = formToProduct(form, editing)
    if (editing) {
      setProducts(products.map(p => p.id === product.id ? product : p))
    } else {
      setProducts([product, ...products])
    }
    setShowModal(false)
  }

  const deleteProduct = (id: string) => {
    if (confirm('Delete this product?')) setProducts(products.filter(p => p.id !== id))
  }

  const updateForm = (partial: Partial<FormState>) => {
    setForm(prev => ({ ...prev, ...partial }))
  }

  const addVariant = () => {
    updateForm({
      variants: [...form.variants, { id: generateId(), type: 'color', label: '', value: '', hex: '#000000', price: 0, inStock: true }]
    })
  }

  const updateVariant = (i: number, v: ProductVariant) => {
    const variants = [...form.variants]
    variants[i] = v
    updateForm({ variants })
  }

  const removeVariant = (i: number) => {
    updateForm({ variants: form.variants.filter((_, idx) => idx !== i) })
  }

  const addSpec = () => {
    updateForm({ specs: [...form.specs, { label: '', value: '' }] })
  }

  const updateSpec = (i: number, s: SpecItem) => {
    const specs = [...form.specs]
    specs[i] = s
    updateForm({ specs })
  }

  const removeSpec = (i: number) => {
    updateForm({ specs: form.specs.filter((_, idx) => idx !== i) })
  }

  const stockStatusColor = (p: Product) => {
    const status = p.inventoryStatus || (p.inStock ? 'in_stock' : 'out_of_stock')
    if (status === 'in_stock') return 'bg-green-100 text-green-700'
    if (status === 'low_stock') return 'bg-amber-100 text-amber-700'
    return 'bg-red-100 text-red-700'
  }

  const stockStatusLabel = (p: Product) => {
    const status = p.inventoryStatus || (p.inStock ? 'in_stock' : 'out_of_stock')
    if (status === 'in_stock') return 'In Stock'
    if (status === 'low_stock') return 'Low Stock'
    return 'Out of Stock'
  }

  const renderInput = (label: string, value: string | number, onChange: (v: any) => void, type = 'text', opts?: { rows?: number; placeholder?: string }) => (
    <div>
      <label className="block font-sans text-label-caps text-primary mb-1.5">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value as string} onChange={e => onChange(e.target.value)} rows={opts?.rows || 3} placeholder={opts?.placeholder} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
      ) : type === 'number' ? (
        <input type="number" value={value} onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))} placeholder={opts?.placeholder} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={opts?.placeholder} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Products ({products.length})</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl ambient-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Product</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">SKU</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Category</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant">Price</th>
                <th className="p-4 font-sans text-label-caps text-on-surface-variant hidden md:table-cell">Stock</th>
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
                        {p.images[0] ? (
                          <img src={p.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        ) : (
                          <span className="font-sans text-xs text-on-surface-variant font-medium">{p.name.charAt(0)}</span>
                        )}
                      </div>
                      <span className="font-sans text-body-md text-primary truncate max-w-[160px] md:max-w-[180px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell"><span className="font-sans text-sm text-on-surface-variant">{p.sku || '—'}</span></td>
                  <td className="p-4 hidden md:table-cell"><span className="font-sans text-sm text-on-surface-variant capitalize">{p.category}</span></td>
                  <td className="p-4">
                    <span className="font-sans text-sm text-primary font-medium">
                      {p.salePrice ? (
                        <><span className="text-red-600">{formatPrice(p.salePrice)}</span> <span className="line-through text-on-surface-variant text-xs">{formatPrice(p.price)}</span></>
                      ) : (
                        formatPrice(p.price)
                      )}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`inline-block px-2.5 py-1 rounded-full font-sans text-xs font-medium ${stockStatusColor(p)}`}>
                      {stockStatusLabel(p)}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      {p.isFeatured && <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-sans text-[10px] font-medium">Featured</span>}
                      {p.isBestSeller && <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 font-sans text-[10px] font-medium">Best Seller</span>}
                      {p.isNew && <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-sans text-[10px] font-medium">New</span>}
                    </div>
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

            <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg font-sans text-label-caps whitespace-nowrap transition-all ${activeTab === t ? 'bg-secondary text-white' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
                  {tabLabels[t]}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {activeTab === 'basic' && (
                <>
                  {renderInput('Name', form.name, (v) => updateForm({ name: v, slug: v.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '') }))}
                  {renderInput('Slug', form.slug, (v) => updateForm({ slug: v }))}
                  <div className="grid grid-cols-2 gap-4">
                    {renderInput('SKU', form.sku, (v) => updateForm({ sku: v }))}
                    {renderInput('Brand', form.brand, (v) => updateForm({ brand: v }))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {renderSelect('Category', form.category, (v) => updateForm({ category: v }), [
                      { value: 'prescription', label: 'Prescription' },
                      { value: 'fashion', label: 'Fashion' },
                      { value: 'sunglasses', label: 'Sunglasses' },
                      { value: 'computer', label: 'Computer' },
                      { value: 'premium', label: 'Premium' },
                      { value: 'men', label: 'Men' },
                      { value: 'women', label: 'Women' },
                    ])}
                    {renderInput('Subcategory', form.subcategory, (v) => updateForm({ subcategory: v }))}
                  </div>
                  {renderInput('Short Description', form.shortDescription, (v) => updateForm({ shortDescription: v }), 'textarea', { rows: 2 })}
                  {renderInput('Description', form.description, (v) => updateForm({ description: v }), 'textarea', { rows: 4 })}
                  {renderInput('Tags (comma separated)', form.tags, (v) => updateForm({ tags: v }))}
                  {renderSelect('Status', form.status, (v) => updateForm({ status: v as 'draft' | 'published' }), [
                    { value: 'draft', label: 'Draft' },
                    { value: 'published', label: 'Published' },
                  ])}
                </>
              )}

              {activeTab === 'pricing' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {renderInput('Cost Price ($)', form.costPrice, (v) => updateForm({ costPrice: v }), 'number')}
                    {renderInput('Regular Price ($)', form.price, (v) => updateForm({ price: v }), 'number')}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {renderInput('Sale Price ($)', form.salePrice, (v) => updateForm({ salePrice: v }), 'text')}
                    {renderInput('Discount (%)', form.discountPercentage, (v) => updateForm({ discountPercentage: v }), 'number')}
                  </div>
                </>
              )}

              {activeTab === 'inventory' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {renderInput('Stock Quantity', form.stockQuantity, (v) => updateForm({ stockQuantity: v }), 'number')}
                    {renderInput('Low Stock Alert', form.lowStockAlert, (v) => updateForm({ lowStockAlert: v }), 'number')}
                  </div>
                  {renderSelect('Inventory Status', form.inventoryStatus, (v) => updateForm({ inventoryStatus: v as 'in_stock' | 'low_stock' | 'out_of_stock' }), [
                    { value: 'in_stock', label: 'In Stock' },
                    { value: 'low_stock', label: 'Low Stock' },
                    { value: 'out_of_stock', label: 'Out of Stock' },
                  ])}
                </>
              )}

              {activeTab === 'images' && (
                <>
                  {renderInput('Featured Image URL', form.featuredImage, (v) => updateForm({ featuredImage: v }))}
                  {form.featuredImage && (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-20 h-20 bg-surface-bright rounded-xl overflow-hidden border border-outline-variant">
                        <img src={form.featuredImage} alt="" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </div>
                      <span className="font-sans text-xs text-on-surface-variant">Featured Image Preview</span>
                    </div>
                  )}
                  {renderInput('Gallery Images (comma-separated URLs)', form.galleryImages, (v) => updateForm({ galleryImages: v }), 'text', { placeholder: 'https://..., https://..., ...' })}
                  {form.galleryImages && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.galleryImages.split(',').map((url, i) => url.trim() && (
                        <div key={i} className="w-16 h-16 bg-surface-bright rounded-xl overflow-hidden border border-outline-variant">
                          <img src={url.trim()} alt="" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'variants' && (
                <div className="space-y-3">
                  {form.variants.length === 0 && (
                    <p className="font-sans text-sm text-on-surface-variant italic">No variants yet. Click "Add Variant" to create one.</p>
                  )}
                  {form.variants.map((v, i) => (
                    <div key={v.id || i} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/50 space-y-3 relative">
                      <button onClick={() => removeVariant(i)} className="absolute top-3 right-3 p-1 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><X size={14} /></button>
                      <div className="grid grid-cols-2 gap-3 pr-8">
                        {renderSelect('Type', v.type, (val) => updateVariant(i, { ...v, type: val as 'size' | 'color' | 'frame_style' | 'power' }), [
                          { value: 'size', label: 'Size' },
                          { value: 'color', label: 'Color' },
                          { value: 'frame_style', label: 'Frame Style' },
                          { value: 'power', label: 'Power' },
                        ])}
                        {renderInput('Label', v.label, (val) => updateVariant(i, { ...v, label: val }))}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {renderInput('Value', v.value, (val) => updateVariant(i, { ...v, value: val }))}
                        {v.type === 'color' && renderInput('Hex Color', v.hex || '#000000', (val) => updateVariant(i, { ...v, hex: val }))}
                      </div>
                      <div className="grid grid-cols-2 gap-3 items-end">
                        {renderInput('Price Adjustment ($)', v.price || 0, (val) => updateVariant(i, { ...v, price: val }), 'number')}
                        <label className="flex items-center gap-2 pb-2 cursor-pointer">
                          <input type="checkbox" checked={v.inStock} onChange={e => updateVariant(i, { ...v, inStock: e.target.checked })} className="rounded border-outline-variant text-secondary focus:ring-secondary" />
                          <span className="font-sans text-sm text-primary">In Stock</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <button onClick={addVariant} className="flex items-center gap-2 px-4 py-2 border border-dashed border-outline-variant rounded-xl font-sans text-label-caps text-secondary hover:bg-surface-container-low transition-all w-full justify-center">
                    <Plus size={14} /> Add Variant
                  </button>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-3">
                  {form.specs.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-1">
                        {renderInput('Label', s.label, (val) => updateSpec(i, { ...s, label: val }))}
                      </div>
                      <div className="flex-1">
                        {renderInput('Value', s.value, (val) => updateSpec(i, { ...s, value: val }))}
                      </div>
                      <button onClick={() => removeSpec(i)} className="mt-7 p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={addSpec} className="flex items-center gap-2 px-4 py-2 border border-dashed border-outline-variant rounded-xl font-sans text-label-caps text-secondary hover:bg-surface-container-low transition-all w-full justify-center">
                    <Plus size={14} /> Add Spec
                  </button>
                </div>
              )}

              {activeTab === 'seo' && (
                <>
                  {renderInput('Meta Title', form.metaTitle, (v) => updateForm({ metaTitle: v }))}
                  {renderInput('Meta Description', form.metaDescription, (v) => updateForm({ metaDescription: v }), 'textarea', { rows: 2 })}
                  {renderInput('Keywords', form.keywords, (v) => updateForm({ keywords: v }))}
                </>
              )}
            </div>

            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-outline-variant/50">
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

            <div className="flex gap-3 pt-6">
              <button onClick={save} className="flex-1 px-5 py-3 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">Save Product</button>
              <button onClick={() => setShowModal(false)} className="px-5 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
