import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const key = serviceKey || anonKey

  if (!url || !key) {
    return NextResponse.json({ database: 'NO_CREDS', storage: 'NO_CREDS' })
  }

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
  const results: Record<string, string> = {}

  // Storage bucket
  try {
    const { data: buckets, error: listErr } = await admin.storage.listBuckets()
    if (listErr) {
      results.storage = `Error: ${listErr.message}`
    } else {
      const exists = buckets?.some(b => b.id === 'product-images')
      if (!exists) {
        const { error } = await admin.storage.createBucket('product-images', { public: true })
        results.storage = error ? `Error: ${error.message}` : 'Created'
      } else {
        results.storage = 'OK'
      }
    }
  } catch (e: any) {
    results.storage = `Error: ${e.message}`
  }

  // Check products table
  try {
    const { data, error } = await admin.from('products').select('id').limit(1)
    if (error) {
      results.database = `ERROR: ${error.message}`
    } else {
      results.database = 'OK'
    }
  } catch (e: any) {
    results.database = `EXCEPTION: ${e.message}`
  }

  return NextResponse.json(results)
}
