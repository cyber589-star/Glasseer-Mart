import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function supabaseFetch<T>(table: string, options?: { order?: string; ascending?: boolean; limit?: number }): Promise<T[]> {
  if (!supabase) return []
  let query = supabase.from(table).select('*')
  if (options?.order) query = query.order(options.order, { ascending: options.ascending ?? false })
  if (options?.limit) query = query.limit(options.limit)
  const { data, error } = await query
  if (error) { console.error(`Supabase ${table} fetch:`, error); return [] }
  return (data || []) as T[]
}

export async function supabaseInsert<T>(table: string, record: Record<string, any>): Promise<T | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from(table).insert(record).select().single()
  if (error) { console.error(`Supabase ${table} insert:`, error); return null }
  return data as T
}

export async function supabaseUpdate<T>(table: string, id: string, record: Record<string, any>): Promise<T | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from(table).update(record).eq('id', id).select().single()
  if (error) { console.error(`Supabase ${table} update:`, error); return null }
  return data as T
}

export async function supabaseDelete(table: string, id: string): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) { console.error(`Supabase ${table} delete:`, error); return false }
  return true
}
