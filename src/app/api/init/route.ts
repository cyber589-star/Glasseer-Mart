import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  if (!url || !serviceKey) {
    return NextResponse.json({ database: 'NO_CREDS', storage: 'NO_CREDS', url: url ? 'set' : 'missing', key: serviceKey ? 'set' : 'missing' })
  }

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
  const results: Record<string, string> = {}

  // 1. Storage bucket
  try {
    const { data: buckets, error: listErr } = await admin.storage.listBuckets()
    if (listErr) {
      results.storage = `List error: ${listErr.message}`
    } else {
      const exists = buckets?.some(b => b.id === 'product-images')
      if (!exists) {
        const { error } = await admin.storage.createBucket('product-images', { public: true })
        results.storage = error ? `Create error: ${error.message}` : 'Created'
      } else {
        results.storage = 'OK'
      }
    }
  } catch (e: any) {
    results.storage = `Exception: ${e.message}`
  }

  // 2. Check products table
  try {
    const { data, error } = await admin.from('products').select('id').limit(1)
    if (error) {
      results.database = `ERROR: ${error.message}`
      results.dbCode = error.code || ''
    } else {
      results.database = 'OK'
    }
  } catch (e: any) {
    results.database = `EXCEPTION: ${e.message}`
  }

  return NextResponse.json(results)
}
