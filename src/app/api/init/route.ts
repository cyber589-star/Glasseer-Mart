import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function POST() {
  if (!url || !serviceKey) return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 })

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
  const results: Record<string, string> = {}

  // 1. Create storage bucket
  try {
    const { data: buckets } = await admin.storage.listBuckets()
    const exists = buckets?.some(b => b.id === 'product-images')
    if (!exists) {
      const { error } = await admin.storage.createBucket('product-images', { public: true })
      results.storage = error ? `Error: ${error.message}` : 'Created'
    } else {
      results.storage = 'Already exists'
    }
  } catch (e: any) {
    results.storage = `Error: ${e.message}`
  }

  // 2. Check if products table exists
  try {
    const { error } = await admin.from('products').select('id').limit(1)
    if (error && error.message.includes('does not exist')) {
      results.database = 'NOT_INITIALIZED'
    } else {
      results.database = 'OK'
    }
  } catch {
    results.database = 'NOT_INITIALIZED'
  }

  return NextResponse.json(results)
}
