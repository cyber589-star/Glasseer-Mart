const snakeToCamel = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
const camelToSnake = (s: string) => s.replace(/([A-Z])/g, '_$1').toLowerCase()

export function toCamel<T>(obj: any): T {
  if (Array.isArray(obj)) return obj.map(v => toCamel(v)) as any
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [snakeToCamel(k), toCamel(v)])) as T
  }
  return obj
}

export function toSnake<T>(obj: any): T {
  if (Array.isArray(obj)) return obj.map(v => toSnake(v)) as any
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [camelToSnake(k), toSnake(v)])) as T
  }
  return obj
}
