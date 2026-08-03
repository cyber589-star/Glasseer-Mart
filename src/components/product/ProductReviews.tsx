'use client'

import { useEffect, useState } from 'react'
import { Star, BadgeCheck, X, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { generateUUID } from '@/lib/utils'
import type { ProductReview } from '@/types'

const LOCAL_KEY = 'glaseermart-local-reviews'

interface ProductReviewsProps {
  reviews: ProductReview[]
  productName: string
  productId: string
}

function loadLocal(): Record<string, ProductReview[]> {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveLocal(productId: string, review: ProductReview) {
  try {
    const all = loadLocal()
    all[productId] = [...(all[productId] || []), review]
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(all))
  } catch {}
}

export function ProductReviews({ reviews: reviewsProp, productName, productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ProductReview[]>(reviewsProp)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const local = loadLocal()[productId] || []
    const dbIds = new Set(reviewsProp.map((r) => r.id))
    setReviews([...local.filter((r) => !dbIds.has(r.id)), ...reviewsProp])
  }, [reviewsProp, productId])

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

  const distribution = [0, 0, 0, 0, 0]
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) distribution[5 - r.rating]++
  })

  const openForm = () => {
    setError('')
    setSuccess('')
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim()) {
      setError('Please enter your name and your review.')
      return
    }
    if (rating < 1) {
      setError('Please select a star rating.')
      return
    }
    setError('')
    setSubmitting(true)

    const review: ProductReview = {
      id: generateUUID(),
      productId,
      customerName: name.trim(),
      rating,
      comment: comment.trim(),
      isFeatured: false,
      date: new Date().toISOString().split('T')[0],
    }

    let savedLocally = false
    if (supabase) {
      const { error: insertError } = await supabase.from('reviews').insert({
        product_id: productId,
        customer_name: review.customerName,
        rating,
        comment: review.comment,
        is_approved: true,
        is_featured: false,
      })
      if (insertError) {
        console.error('Failed to save review:', insertError)
        saveLocal(productId, review)
        savedLocally = true
      }
    } else {
      saveLocal(productId, review)
      savedLocally = true
    }

    setReviews((prev) => [review, ...prev])
    setShowForm(false)
    setSubmitting(false)
    setName('')
    setRating(0)
    setComment('')
    setSuccess(
      savedLocally
        ? 'Thank you! Your review has been saved and is now visible on this product.'
        : 'Thank you! Your review has been posted to this product.'
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Customer Reviews</h2>
        <button
          onClick={openForm}
          className="px-6 py-3 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:bg-secondary"
        >
          Write a Review
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-3 px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-xl">
          <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
          <p className="font-sans text-sm text-secondary">{success}</p>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-serif text-headline-sm text-on-surface-variant mb-2">No reviews yet</p>
          <p className="font-sans text-body-md text-on-surface-variant">
            Be the first to share your thoughts on {productName}.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-8 p-8 bg-surface-bright rounded-2xl">
            <div className="text-center">
              <div className="font-serif text-display-lg text-primary">{average.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={
                      s <= Math.round(average)
                        ? 'fill-secondary text-secondary'
                        : 'fill-surface-container-high text-surface-container-high'
                    }
                  />
                ))}
              </div>
              <p className="font-sans text-sm text-on-surface-variant mt-2">
                {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[5 - star]
                const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="font-sans text-sm text-on-surface-variant w-4">{star}</span>
                    <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-sans text-xs text-on-surface-variant w-10 text-right">
                      {Math.round(pct)}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 border border-outline-variant rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-serif text-sm text-primary font-bold">
                        {review.customerName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-sans text-sm text-primary font-medium">{review.customerName}</p>
                        <span className="font-sans text-xs text-on-surface-variant">· {review.date}</span>
                      </div>
                      <p className="font-sans text-xs text-on-surface-variant">Verified Buyer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {review.isFeatured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary font-sans text-xs rounded-full">
                        <BadgeCheck size={12} />
                        Featured
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          size={12}
                          className={
                            j < review.rating
                              ? 'fill-secondary text-secondary'
                              : 'fill-surface-container-high text-surface-container-high'
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-sans text-body-md text-on-surface-variant">{review.comment}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-ambient-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-headline-sm text-primary">Write a Review</h3>
              <button onClick={() => setShowForm(false)} className="p-1 text-on-surface-variant hover:text-primary">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary"
                />
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Your Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button" onClick={() => setRating(s)} className="p-1 hover:scale-110 transition-transform">
                      <Star
                        size={26}
                        className={
                          s <= rating
                            ? 'fill-secondary text-secondary'
                            : 'fill-surface-container-high text-surface-container-high'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-sans text-label-caps text-primary mb-1.5">Your Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder={`Share your experience with ${productName}...`}
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-secondary font-sans text-body-md text-primary resize-none"
                />
              </div>
              {error && <p className="font-sans text-sm text-red-600">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 px-5 py-3 bg-secondary text-white rounded-xl font-sans text-label-caps hover:bg-primary transition-all disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
