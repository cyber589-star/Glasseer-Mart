const snakeToCamel = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
const camelToSnake = (s: string) => s.replace(/([A-Z])/g, '_$1').toLowerCase()

const JSON_FIELDS = new Set(['items', 'images', 'colors', 'features', 'specs', 'tags', 'reviews', 'variants', 'gallery_images', 'seo', 'badges'])

function isJsonField(key: string): boolean {
  return JSON_FIELDS.has(key) || JSON_FIELDS.has(camelToSnake(key))
}

export function toCamel<T>(obj: any): T {
  if (Array.isArray(obj)) return obj.map(v => toCamel(v)) as any
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        snakeToCamel(k),
        isJsonField(k) ? v : (v && typeof v === 'object' ? toCamel(v) : v)
      ])
    ) as T
  }
  return obj
}

export function toSnake<T>(obj: any): T {
  if (Array.isArray(obj)) return obj.map(v => toSnake(v)) as any
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    const entries = Object.entries(obj).filter(([_, v]) => v !== undefined)
    return Object.fromEntries(
      entries.map(([k, v]) => [
        camelToSnake(k),
        isJsonField(k) ? v : (v && typeof v === 'object' ? toSnake(v) : v)
      ])
    ) as T
  }
  return obj
}
