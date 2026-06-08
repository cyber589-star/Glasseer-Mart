import { Product, Category, Testimonial, FAQItem, Brand, Customer, Coupon, Inquiry, Subscriber, MediaItem, HomeContent, SiteSettings } from '@/types'

export const categories: Category[] = [
  {
    id: 'prescription',
    name: 'Prescription Glasses',
    slug: 'prescription-glasses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXWRhsL-jSmJpCdfLNPLpDBuKsA7lERyG0JtjKmodK-Hm8lI8u6-yfxkeWju6NlS7eNvQB-AotuhtNBxkF2msvLu4f0V2dNtZOo5deW7hVgnf58R1TtbSPP6V441iC2cK3H75BOTcQ2xQsEHtZqEsECt6a7vZsUHDZRJrn0LNSz7m3HcPdwtonf_sa_jUO-VUBZm-Xn6kOIxQOTSLqxalz3hx446NLub75j9CMUydHZXumFzhzStAoVk7ZnPaTdFWIgAvLsmgRg5kn',
    count: 24,
    description: 'Crafted for clarity, engineered for comfort.',
  },
  {
    id: 'fashion',
    name: 'Fashion Glasses',
    slug: 'fashion-glasses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP7hhJf3SO9NKeyV2LQ33ayhhBNiI6d0xQZ4C9jEpOmdshUIGmNYozf4FtJTNadTbx94l1nrR5cbcMURCpPGVu2hpuFI69i7iXv4-BpD-p7WiFQRT4trI3S6vp_4Z3dxN0rA9930yOCzAkx98DJ7U6w-xUQLQ4IcECZZOjqs_CkA034DZ1JbNenXvJYPj7h10tKAvg0A2v3cJ0lrr_S6lyj0_HMkr6Nrl8gTvEdj2w1N_Sif9oHHNX8gFV3Yv__HjEpILPEBphGkf6',
    count: 18,
    description: 'Statement pieces for the style-conscious.',
  },
  {
    id: 'sunglasses',
    name: 'Sunglasses',
    slug: 'sunglasses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlN0tukJnkT47xHoAvGA68BfQ8BIhIl9fSWKX6MLXqcXQvrr3RUfKpPxOugxz6dKK4HlW9mafw4PMxRzCC5lwTc0mc6xc6snWPN_VlmxkeKyFG0NS0bv8Kc6aZiv8oGQuct5eFUi9J1jm0-wbmogMwhKuKjT3GwlEVaX-rouCBJocXG-nAYz9-pGE02Oed3zWvccR8aszItcHNlFCH06R2Hsw8kF7iBZsg8h28WwsvX3BPHnz8-mJnbZMxGNtmTH7bfNxXMpVGNSGn',
    count: 30,
    description: 'Protect your vision with uncompromising style.',
  },
  {
    id: 'computer',
    name: 'Computer Glasses',
    slug: 'computer-glasses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV5F1QAMyokPONLCxe62PDuS8LmTLev_nO90QQW16-9rPJuODCKxlGiHftREa1oTg0VCe7yxJwuppfM0C_2949771BXl8WK6xGnflyV6x7thsFvaqhwlDvKEtRciY3xJ9Qu3KHt3h6VR4CMOQ9VuN7j0ZFmmj8Tjjaag88sKe2pXhrCrR54e8gf1wuXouejNzqOPX92EcM60YwU4m6Ai1l_Hs6FT5lnrxddsaFUf3Kg8tSMgzllRnfgxxpR2I7m17tDjaEi_QBd5Yf',
    count: 12,
    description: 'Digital protection for the modern professional.',
  },
  {
    id: 'men',
    name: "Men's Collection",
    slug: 'men-collection',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV5F1QAMyokPONLCxe62PDuS8LmTLev_nO90QQW16-9rPJuODCKxlGiHftREa1oTg0VCe7yxJwuppfM0C_2949771BXl8WK6xGnflyV6x7thsFvaqhwlDvKEtRciY3xJ9Qu3KHt3h6VR4CMOQ9VuN7j0ZFmmj8Tjjaag88sKe2pXhrCrR54e8gf1wuXouejNzqOPX92EcM60YwU4m6Ai1l_Hs6FT5lnrxddsaFUf3Kg8tSMgzllRnfgxxpR2I7m17tDjaEi_QBd5Yf',
    count: 22,
    description: 'Bold, refined frames for the modern gentleman.',
  },
  {
    id: 'women',
    name: "Women's Collection",
    slug: 'women-collection',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP7hhJf3SO9NKeyV2LQ33ayhhBNiI6d0xQZ4C9jEpOmdshUIGmNYozf4FtJTNadTbx94l1nrR5cbcMURCpPGVu2hpuFI69i7iXv4-BpD-p7WiFQRT4trI3S6vp_4Z3dxN0rA9930yOCzAkx98DJ7U6w-xUQLQ4IcECZZOjqs_CkA034DZ1JbNenXvJYPj7h10tKAvg0A2v3cJ0lrr_S6lyj0_HMkr6Nrl8gTvEdj2w1N_Sif9oHHNX8gFV3Yv__HjEpILPEBphGkf6',
    count: 28,
    description: 'Elegance redefined for every occasion.',
  },
  {
    id: 'premium',
    name: 'Premium Collection',
    slug: 'premium-collection',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXWRhsL-jSmJpCdfLNPLpDBuKsA7lERyG0JtjKmodK-Hm8lI8u6-yfxkeWju6NlS7eNvQB-AotuhtNBxkF2msvLu4f0V2dNtZOo5deW7hVgnf58R1TtbSPP6V441iC2cK3H75BOTcQ2xQsEHtZqEsECt6a7vZsUHDZRJrn0LNSz7m3HcPdwtonf_sa_jUO-VUBZm-Xn6kOIxQOTSLqxalz3hx446NLub75j9CMUydHZXumFzhzStAoVk7ZnPaTdFWIgAvLsmgRg5kn',
    count: 15,
    description: 'Our finest materials, our most exceptional designs.',
  },
]

export const products: Product[] = [
  {
    id: 'classic-tortoise',
    name: 'Classic Tortoise',
    slug: 'classic-tortoise',
    description: 'Timeless tortoiseshell acetate frame with premium anti-reflective lenses. A wardrobe essential for every style.',
    price: 2999,
    originalPrice: 3999,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCV5F1QAMyokPONLCxe62PDuS8LmTLev_nO90QQW16-9rPJuODCKxlGiHftREa1oTg0VCe7yxJwuppfM0C_2949771BXl8WK6xGnflyV6x7thsFvaqhwlDvKEtRciY3xJ9Qu3KHt3h6VR4CMOQ9VuN7j0ZFmmj8Tjjaag88sKe2pXhrCrR54e8gf1wuXouejNzqOPX92EcM60YwU4m6Ai1l_Hs6FT5lnrxddsaFUf3Kg8tSMgzllRnfgxxpR2I7m17tDjaEi_QBd5Yf',
    ],
    category: 'fashion',
    isBestSeller: true,
    inStock: true,
    colors: [{ name: 'Tortoiseshell', hex: '#8B6914' }],
    variants: [
      { id: 'ct-size-m', type: 'size', label: 'Medium', value: 'M', inStock: true },
      { id: 'ct-size-l', type: 'size', label: 'Large', value: 'L', inStock: true },
      { id: 'ct-power-0', type: 'power', label: 'Without Power', value: 'Without Power', inStock: true },
      { id: 'ct-power-1', type: 'power', label: 'With Power', value: 'With Power', inStock: true },
    ],
    createdAt: '2026-01-01',
    rating: 4.8,
    reviewCount: 0,
    features: [],
    specs: [],
    tags: [],
  },
  {
    id: 'sleek-black',
    name: 'Sleek Black',
    slug: 'sleek-black',
    description: 'Minimalist matte black frame with a lightweight titanium build. Modern sophistication for everyday wear.',
    price: 3499,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDP7hhJf3SO9NKeyV2LQ33ayhhBNiI6d0xQZ4C9jEpOmdshUIGmNYozf4FtJTNadTbx94l1nrR5cbcMURCpPGVu2hpuFI69i7iXv4-BpD-p7WiFQRT4trI3S6vp_4Z3dxN0rA9930yOCzAkx98DJ7U6w-xUQLQ4IcECZZOjqs_CkA034DZ1JbNenXvJYPj7h10tKAvg0A2v3cJ0lrr_S6lyj0_HMkr6Nrl8gTvEdj2w1N_Sif9oHHNX8gFV3Yv__HjEpILPEBphGkf6',
    ],
    category: 'fashion',
    isFeatured: true,
    inStock: true,
    colors: [{ name: 'Matte Black', hex: '#1a1a1a' }],
    variants: [
      { id: 'sb-size-m', type: 'size', label: 'Medium', value: 'M', inStock: true },
      { id: 'sb-size-l', type: 'size', label: 'Large', value: 'L', inStock: true },
      { id: 'sb-power-0', type: 'power', label: 'Without Power', value: 'Without Power', inStock: true },
      { id: 'sb-power-1', type: 'power', label: 'With Power', value: 'With Power', inStock: true },
    ],
    createdAt: '2026-01-01',
    rating: 4.6,
    reviewCount: 0,
    features: [],
    specs: [],
    tags: [],
  },
  {
    id: 'golden-aviator',
    name: 'Golden Aviator',
    slug: 'golden-aviator',
    description: 'Classic aviator sunglasses with gold-plated frame and polarized UV400 lenses. Timeless sun protection.',
    price: 4999,
    originalPrice: 5999,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlN0tukJnkT47xHoAvGA68BfQ8BIhIl9fSWKX6MLXqcXQvrr3RUfKpPxOugxz6dKK4HlW9mafw4PMxRzCC5lwTc0mc6xc6snWPN_VlmxkeKyFG0NS0bv8Kc6aZiv8oGQuct5eFUi9J1jm0-wbmogMwhKuKjT3GwlEVaX-rouCBJocXG-nAYz9-pGE02Oed3zWvccR8aszItcHNlFCH06R2Hsw8kF7iBZsg8h28WwsvX3BPHnz8-mJnbZMxGNtmTH7bfNxXMpVGNSGn',
    ],
    category: 'sunglasses',
    isBestSeller: true,
    isNew: true,
    inStock: true,
    colors: [{ name: 'Gold', hex: '#D4AF37' }],
    variants: [
      { id: 'ga-size-m', type: 'size', label: 'Medium', value: 'M', inStock: true },
      { id: 'ga-size-l', type: 'size', label: 'Large', value: 'L', inStock: true },
    ],
    createdAt: '2026-01-01',
    rating: 4.7,
    reviewCount: 0,
    features: [],
    specs: [],
    tags: [],
  },
  {
    id: 'crystal-clear',
    name: 'Crystal Clear',
    slug: 'crystal-clear',
    description: 'Bold transparent acetate frame with blue light filtering lenses. Modern sophistication for the digital age.',
    price: 2799,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXWRhsL-jSmJpCdfLNPLpDBuKsA7lERyG0JtjKmodK-Hm8lI8u6-yfxkeWju6NlS7eNvQB-AotuhtNBxkF2msvLu4f0V2dNtZOo5deW7hVgnf58R1TtbSPP6V441iC2cK3H75BOTcQ2xQsEHtZqEsECt6a7vZsUHDZRJrn0LNSz7m3HcPdwtonf_sa_jUO-VUBZm-Xn6kOIxQOTSLqxalz3hx446NLub75j9CMUydHZXumFzhzStAoVk7ZnPaTdFWIgAvLsmgRg5kn',
    ],
    category: 'fashion',
    isNew: true,
    inStock: true,
    colors: [{ name: 'Crystal Clear', hex: '#F0F0F0' }],
    variants: [
      { id: 'cc-size-m', type: 'size', label: 'Medium', value: 'M', inStock: true },
      { id: 'cc-size-l', type: 'size', label: 'Large', value: 'L', inStock: true },
      { id: 'cc-power-0', type: 'power', label: 'Without Power', value: 'Without Power', inStock: true },
      { id: 'cc-power-1', type: 'power', label: 'With Power', value: 'With Power', inStock: true },
    ],
    createdAt: '2026-01-01',
    rating: 4.9,
    reviewCount: 0,
    features: [],
    specs: [],
    tags: [],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Verified Buyer',
    avatar: '',
    rating: 5,
    comment: 'The Onyx frames are absolutely stunning. The quality is evident from the moment you hold them. Worth every penny.',
  },
  {
    id: '2',
    name: 'James Chen',
    role: 'Verified Buyer',
    avatar: '',
    rating: 5,
    comment: 'Best investment for my eyes. The computer glasses have dramatically reduced my digital eye strain.',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Verified Buyer',
    avatar: '',
    rating: 4,
    comment: 'Beautiful craftsmanship. I receive compliments everywhere I go. The customer service was exceptional.',
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Verified Buyer',
    avatar: '',
    rating: 5,
    comment: 'The Strata sunglasses are incredible. The polarized lenses make everything look better.',
  },
  {
    id: '5',
    name: 'Olivia Parker',
    role: 'Verified Buyer',
    avatar: '',
    rating: 5,
    comment: 'Finally, eyewear that feels as premium as it looks. The packaging alone is a work of art.',
  },
  {
    id: '6',
    name: 'Marcus Thompson',
    role: 'Verified Buyer',
    avatar: '',
    rating: 4,
    comment: 'Fast shipping, beautiful product. The Vertex carbon fiber frames are incredibly lightweight.',
  },
]

export const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'What materials are used in GlaseerMart frames?',
    answer: 'Our frames are crafted from the finest materials including Japanese acetate, aerospace-grade titanium, stainless steel, and Mazzucchelli acetate from Italy. Each material is selected for its durability, comfort, and aesthetic qualities.',
  },
  {
    id: '2',
    question: 'Do you offer prescription lenses?',
    answer: 'Yes, all our frames can be fitted with prescription lenses. Simply select your frame and choose the prescription option during checkout. You can provide your prescription details, and our opticians will craft your lenses with precision.',
  },
  {
    id: '3',
    question: 'Do you deliver to Lahore, Karachi, Islamabad, and other Pakistani cities?',
    answer: 'Yes! We deliver to all major cities including Lahore, Karachi, Islamabad, Peshawar, Faisalabad, Rawalpindi, Multan, Quetta, Hyderabad, Gujranwala, Sialkot, and hundreds of smaller towns across Pakistan. Your order will reach you via our trusted courier partners within 2-5 business days.',
  },
  {
    id: '4',
    question: 'What is your return policy?',
    answer: 'We offer a 7-day satisfaction guarantee. If you\'re not completely satisfied with your purchase, you can return it within 7 days for a full refund. Frames must be in original condition with all packaging. We\'ll arrange a pickup from your city — no shipping costs for you.',
  },
  {
    id: '5',
    question: 'How long does delivery take within Pakistan?',
    answer: 'Orders are delivered within 2-5 business days across Pakistan. Lahore and Karachi typically arrive in 2-3 days, while smaller cities may take up to 5 business days. We also offer express delivery for urgent orders — contact us to arrange it.',
  },
  {
    id: '6',
    question: 'Do you offer blue light blocking lenses?',
    answer: 'Yes — many of our frames come with optional blue light filtering lenses, perfect for reducing digital eye strain during long screen hours. Select the blue light lens option during checkout or browse our computer glasses category.',
  },
  {
    id: '7',
    question: 'How do I find my frame size?',
    answer: 'Each product page includes lens width, bridge width, and temple length measurements. Most of our frames are medium to large fit. If you\'re unsure, contact us on WhatsApp and we\'ll help you choose the right size.',
  },
  {
    id: '8',
    question: 'Do you offer warranty on your products?',
    answer: 'Yes, all GlaseerMart frames come with a 1-year warranty against manufacturing defects including frame breakage, hinge issues, and coating defects under normal use.',
  },
  {
    id: '9',
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD) across Pakistan. No credit card or bank transfer needed — simply pay cash when your order arrives at your doorstep.',
  },
  {
    id: '10',
    question: 'How can I contact your support team?',
    answer: 'You can reach us on WhatsApp at 0323-8284762, email us at contact@glasseermart.store, or use the contact form on our website. We respond within 1-2 hours during business hours.',
  },
]

export const brands: Brand[] = []
export const customers: Customer[] = []
export const coupons: Coupon[] = []
export const inquiries: Inquiry[] = []
export const subscribers: Subscriber[] = []
export const mediaItems: MediaItem[] = []

export const homeContent: HomeContent = {
  heroTitle: '',
  heroSubtitle: '',
  heroVideoUrl: '/images/hero-bg.mp4',
  heroCtaText: '',
  heroCtaLink: '/shop',
  aboutTitle: '',
  aboutText: '',
  newsletterTitle: '',
  newsletterText: '',
}

export const siteSettings = {
  siteName: 'GlaseerMart',
  tagline: 'Premium Optical & Stylish Glasses',
  description: 'Discover luxury eyewear crafted for the discerning eye.',
  email: 'umerzubair4800@gmail.com',
  phone: '0323-8284762',
  address: 'Lahore, Pakistan',
  currency: 'USD',
  taxRate: 8,
  shippingFreeThreshold: 200,
  shippingRate: 15,
  social: {
    instagram: 'https://www.instagram.com/glaseer.mart',
    facebook: 'https://www.facebook.com/share/1Gr542DxdL/',
    tiktok: 'https://www.tiktok.com/@glaseer.mart',
  },
}

export const siteConfig = {
  name: 'GlaseerMart',
  tagline: 'Premium Optical & Stylish Glasses',
  description: 'Discover luxury eyewear crafted for the discerning eye. Premium optical glasses, fashion frames, and sunglasses at GlaseerMart.',
  email: 'umerzubair4800@gmail.com',
  phone: '0323-8284762',
  social: {
    instagram: 'https://www.instagram.com/glaseer.mart',
    facebook: 'https://www.facebook.com/share/1Gr542DxdL/',
    tiktok: 'https://www.tiktok.com/@glaseer.mart',
  },
  address: 'Lahore, Pakistan',
}
