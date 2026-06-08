import Link from 'next/link'
import { Container } from '@/components/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GlaseerMart Blog — Eyewear Trends, Guides & Tips',
  description: 'Expert guides on choosing the right glasses, eyewear trends, blue light benefits, and more. Your source for premium eyewear knowledge in Pakistan.',
}

const posts = [
  {
    slug: 'eyewear-trends-2026',
    title: 'Best Eyewear Trends 2026 — What\'s In Style This Year',
    excerpt: 'Discover the top eyewear trends of 2026 including oversized frames, geometric shapes, transparent acetate, and sustainable materials. Find your next style.',
    date: 'June 2026',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    tags: ['Trends', 'Style Guide', 'Fashion'],
    readTime: '5 min read',
  },
  {
    slug: 'how-to-choose-glasses-for-face-shape',
    title: 'How to Choose Glasses for Your Face Shape — Complete Guide',
    excerpt: 'Learn which frame shapes complement oval, round, square, heart, and diamond face shapes. The ultimate guide to finding glasses that fit your face.',
    date: 'May 2026',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&q=80',
    tags: ['Style Guide', 'Shopping Tips'],
    readTime: '7 min read',
  },
  {
    slug: 'benefits-of-blue-light-glasses',
    title: 'Benefits of Blue Light Glasses — Protect Your Eyes in Digital Age',
    excerpt: 'Blue light glasses reduce digital eye strain, improve sleep quality, and protect your vision. Learn why every screen user needs them.',
    date: 'April 2026',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&q=80',
    tags: ['Eye Health', 'Blue Light', 'Lifestyle'],
    readTime: '6 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-serif text-headline-lg text-primary mb-4">GlaseerMart Blog</h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Style guides, eyewear trends, and expert tips to help you find the perfect pair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-surface-bright rounded-2xl overflow-hidden ambient-shadow hover-lift transition-all duration-300"
            >
              <div className="aspect-[16/10] bg-surface-container-low overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-secondary/10 text-secondary font-sans text-[11px] font-medium rounded-full">{tag}</span>
                  ))}
                  <span className="font-sans text-xs text-on-surface-variant ml-auto">{post.readTime}</span>
                </div>
                <h2 className="font-serif text-headline-sm text-primary mb-3 group-hover:text-secondary transition-colors">{post.title}</h2>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 font-sans text-xs text-on-surface-variant">{post.date}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16 p-8 bg-secondary/5 rounded-2xl border border-secondary/20">
          <h2 className="font-serif text-headline-sm text-primary mb-3">Visit Our Shop</h2>
          <p className="font-sans text-body-md text-on-surface-variant mb-6">Browse our premium eyewear collection and find your perfect frame.</p>
          <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-secondary">
            Shop Now
          </Link>
        </div>
      </Container>
    </div>
  )
}
