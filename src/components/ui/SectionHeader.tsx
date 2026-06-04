'use client'

import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ title, subtitle, className, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={cn(
      'flex flex-col gap-3 md:gap-4 mb-8 md:mb-12',
      align === 'center' && 'items-center text-center',
      className
    )}>
      <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-body-md md:text-body-lg text-on-surface-variant max-w-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
