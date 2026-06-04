'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'

export function useSupabaseData<T>(table: string, initialValue: T[]) {
  const [data, setData] = useState<T[]>(initialValue)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    const { data: result } = await supabase.from(table).select('*')
    setData((result || []) as unknown as T[])
    setLoading(false)
  }, [table])

  useEffect(() => { fetchData() }, [fetchData])

  const save = async (record: T & { id?: string }) => {
    if (record.id) {
      const { data: updated } = await supabase.from(table).update(record as any).eq('id', record.id).select().single()
      if (updated) setData(prev => prev.map((p: any) => p.id === record.id ? updated as unknown as T : p))
    } else {
      const { data: inserted } = await supabase.from(table).insert(record as any).select().single()
      if (inserted) setData(prev => [...prev, inserted as unknown as T])
    }
  }

  const remove = async (id: string) => {
    await supabase.from(table).delete().eq('id', id)
    setData(prev => prev.filter((p: any) => p.id !== id))
  }

  return { data, setData, loading, save, remove }
}
