export interface ProductVariant {
  id: string
  type: 'size' | 'color' | 'frame_style'
  label: string
  value: string
  hex?: string
  price?: number
  inStock: boolean
}

export interface SpecItem {
  label: string
  value: string
}

export interface ProductReview {
  id: string
  productId: string
  customerName: string
  rating: number
  comment: string
  isFeatured: boolean
  date: string
}

export interface SEO {
  metaTitle: string
  metaDescription: string
  keywords: string
}

export interface Product {
  id: string
  name: string
  slug: string
  sku?: string
  brand?: string
  category: string
  subcategory?: string
  description: string
  shortDescription?: string
  costPrice?: number
  price: number
  salePrice?: number
  discountPercentage?: number
  stockQuantity?: number
  lowStockAlert?: number
  inventoryStatus?: 'in_stock' | 'low_stock' | 'out_of_stock'
  featuredImage?: string
  galleryImages?: string[]
  variants?: ProductVariant[]
  specs: SpecItem[]
  features: string[]
  tags: string[]
  status?: 'draft' | 'published'
  isFeatured?: boolean
  isBestSeller?: boolean
  isNew?: boolean
  rating: number
  reviewCount: number
  reviews?: ProductReview[]
  seo?: SEO
  createdAt: string
  images: string[]
  colors: { name: string; hex: string }[]
  inStock: boolean
  originalPrice?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  count: number
  description: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  description: string
  logo: string
  productCount: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  altPhone: string
  province: string
  city: string
  address: string
  orders: number
  totalSpent: number
  status: 'active' | 'inactive'
  joinedDate: string
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrder: number
  usageLimit: number
  usedCount: number
  expiresAt: string
  status: 'active' | 'expired' | 'disabled'
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  variant?: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerMobile: string
  customerAltPhone: string
  province: string
  city: string
  address: string
  postalCode: string
  orderNotes: string
  items: OrderItem[]
  deliveryCharges: number
  subtotal: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'failed' | 'cancelled'
  paymentMethod: 'cod' | 'card'
  trackingNumber: string
  date: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedVariant?: string
  selectedColor?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  comment: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  date: string
}

export interface Subscriber {
  id: string
  email: string
  subscribedAt: string
  status: 'active' | 'unsubscribed'
}

export interface MediaItem {
  id: string
  url: string
  name: string
  type: string
  size: number
  uploadedAt: string
}

export interface HomeContent {
  heroTitle: string
  heroSubtitle: string
  heroVideoUrl: string
  heroCtaText: string
  heroCtaLink: string
  aboutTitle: string
  aboutText: string
  newsletterTitle: string
  newsletterText: string
}

export interface SiteSettings {
  siteName: string
  tagline: string
  description: string
  email: string
  phone: string
  address: string
  currency: string
  taxRate: number
  shippingFreeThreshold: number
  shippingRate: number
  social: {
    instagram: string
    facebook: string
    tiktok: string
  }
}
