import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.glasseermart.store'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/shop', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/faq', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/cart', priority: 0.4, changeFreq: 'monthly' as const },
    { path: '/checkout', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/wishlist', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/account', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/account/orders', priority: 0.2, changeFreq: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
  ]

  return staticRoutes.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }))
}
