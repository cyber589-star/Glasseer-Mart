'use client'

import { Star, BadgeCheck } from 'lucide-react'
import type { ProductReview } from '@/types'

interface ProductReviewsProps {
  reviews: ProductReview[]
  productName: string
  productId: string
}

export function ProductReviews({ reviews, productName, productId }: ProductReviewsProps) {
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

  const distribution = [0, 0, 0, 0, 0]
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) distribution[5 - r.rating]++
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-headline-sm text-primary">Customer Reviews</h2>
        <button className="px-6 py-3 bg-primary text-on-primary rounded-lg font-sans text-label-caps transition-all duration-300 hover:bg-secondary">
          Write a Review
        </button>
      </div>

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
    </div>
  )
}
