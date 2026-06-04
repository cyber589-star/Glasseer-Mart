'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  rating: number
  reviewCount?: number
  className?: string
}

export function Rating({ rating, reviewCount, className }: RatingProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={cn(
              'transition-colors',
              star <= Math.round(rating)
                ? 'fill-secondary text-secondary'
                : 'fill-surface-container-high text-surface-container-high'
            )}
          />
        ))}
      </div>
      <span className="font-sans text-sm text-on-surface-variant">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="font-sans text-sm text-on-surface-variant">
          ({reviewCount})
        </span>
      )}
    </div>
  )
}
