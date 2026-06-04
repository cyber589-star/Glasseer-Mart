import { categories } from '@/data/products'

export function useCategories() {
  return { categories, loading: false }
}
