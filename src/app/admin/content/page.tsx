'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { homeContent as initialContent } from '@/data/products'
import type { HomeContent } from '@/types'

export default function AdminContent() {
  const [content, setContent] = useLocalStorage<HomeContent>('admin-home-content', initialContent)
  const [form, setForm] = useState<HomeContent>({ ...content })
  const [saved, setSaved] = useState(false)

  const save = () => {
    setContent(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const hasChanges = JSON.stringify(form) !== JSON.stringify(content)

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Homepage Content</h2>
        <button
          onClick={save}
          disabled={!hasChanges}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-label-caps transition-all ${hasChanges ? 'bg-secondary text-white hover:bg-primary' : 'bg-surface-container-low text-on-surface-variant cursor-not-allowed'}`}
        >
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow space-y-6">
        <h3 className="font-serif text-headline-sm text-primary">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block font-sans text-label-caps text-primary mb-1.5">Hero Title</label>
            <input value={form.heroTitle} onChange={e => setForm({...form, heroTitle: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
          </div>
          <div>
            <label className="block font-sans text-label-caps text-primary mb-1.5">Hero Subtitle</label>
            <textarea value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
          </div>
          <div>
            <label className="block font-sans text-label-caps text-primary mb-1.5">Hero Video URL</label>
            <input value={form.heroVideoUrl} onChange={e => setForm({...form, heroVideoUrl: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-label-caps text-primary mb-1.5">CTA Text</label>
              <input value={form.heroCtaText} onChange={e => setForm({...form, heroCtaText: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
            </div>
            <div>
              <label className="block font-sans text-label-caps text-primary mb-1.5">CTA Link</label>
              <input value={form.heroCtaLink} onChange={e => setForm({...form, heroCtaLink: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow space-y-4">
        <h3 className="font-serif text-headline-sm text-primary">About Section</h3>
        <div>
          <label className="block font-sans text-label-caps text-primary mb-1.5">About Title</label>
          <input value={form.aboutTitle} onChange={e => setForm({...form, aboutTitle: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
        </div>
        <div>
          <label className="block font-sans text-label-caps text-primary mb-1.5">About Text</label>
          <textarea value={form.aboutText} onChange={e => setForm({...form, aboutText: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow space-y-4">
        <h3 className="font-serif text-headline-sm text-primary">Newsletter Section</h3>
        <div>
          <label className="block font-sans text-label-caps text-primary mb-1.5">Newsletter Title</label>
          <input value={form.newsletterTitle} onChange={e => setForm({...form, newsletterTitle: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary" />
        </div>
        <div>
          <label className="block font-sans text-label-caps text-primary mb-1.5">Newsletter Text</label>
          <textarea value={form.newsletterText} onChange={e => setForm({...form, newsletterText: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none" />
        </div>
      </div>
    </div>
  )
}
