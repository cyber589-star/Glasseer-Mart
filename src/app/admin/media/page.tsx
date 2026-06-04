'use client'

import { useState } from 'react'
import { Trash2, Image, Film, File, Plus, X } from 'lucide-react'
import { mediaItems as initialMedia } from '@/data/products'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { generateId } from '@/lib/utils'
import type { MediaItem } from '@/types'

const typeIcons: Record<string, typeof Image> = {
  'image/jpeg': Image,
  'image/png': Image,
  'image/gif': Image,
  'image/webp': Image,
  'video/mp4': Film,
  'video/quicktime': Film,
}

function formatSize(bytes: number) {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB'
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return bytes + ' B'
}

function getTypeIcon(type: string) {
  const Icon = typeIcons[type] || File
  return Icon
}

export default function AdminMedia() {
  const [media, setMedia] = useLocalStorage<MediaItem[]>('admin-media', initialMedia)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ url: '', name: '', type: 'image/jpeg', size: 0 })

  const addMedia = () => {
    if (!form.url || !form.name) return
    const item: MediaItem = {
      id: generateId(),
      url: form.url,
      name: form.name,
      type: form.type,
      size: form.size,
      uploadedAt: new Date().toISOString().split('T')[0],
    }
    setMedia([item, ...media])
    setForm({ url: '', name: '', type: 'image/jpeg', size: 0 })
    setShowModal(false)
  }

  const deleteMedia = (id: string) => {
    if (confirm('Delete this media item?')) setMedia(media.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Media Library ({media.length})</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">
          <Plus size={16} /> Add Media
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {media.map(item => {
          const Icon = getTypeIcon(item.type)
          const isImage = item.type.startsWith('image/')
          return (
            <div key={item.id} className="bg-white rounded-2xl ambient-shadow overflow-hidden group">
              <div className="aspect-square bg-surface-bright relative">
                {isImage ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon size={40} className="text-on-surface-variant" />
                  </div>
                )}
                <button onClick={() => deleteMedia(item.id)} className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-3">
                <p className="font-sans text-xs text-primary truncate mb-0.5">{item.name}</p>
                <p className="font-sans text-xs text-on-surface-variant">{item.type.split('/')[1]?.toUpperCase() || item.type} · {formatSize(item.size)}</p>
              </div>
            </div>
          )
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-ambient-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-headline-sm text-primary">Add Media</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-primary"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">URL</label>
                <input value={form.url} onChange={e => setForm({...form, url: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary">
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/gif">GIF</option>
                  <option value="image/webp">WebP</option>
                  <option value="video/mp4">MP4</option>
                </select>
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Size (bytes)</label>
                <input type="number" value={form.size} onChange={e => setForm({...form, size: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={addMedia} className="flex-1 px-5 py-3 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all">Add</button>
                <button onClick={() => setShowModal(false)} className="px-5 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
