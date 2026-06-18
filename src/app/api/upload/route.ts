import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const key = serviceKey || anonKey

  if (!url || !key) return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Only images' }, { status: 400 })

  const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

  // Ensure bucket
  const { data: buckets } = await client.storage.listBuckets()
  if (!buckets?.some(b => b.id === 'product-images')) {
    await client.storage.createBucket('product-images', { public: true })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`

  const { data, error } = await client.storage
    .from('product-images')
    .upload(path, buffer, { contentType: file.type, upsert: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: urlData } = client.storage.from('product-images').getPublicUrl(path)
  return NextResponse.json({ url: urlData.publicUrl })
}
