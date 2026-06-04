'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  dark?: boolean
}

export function GlassPanel({ children, className, dark }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'glass-panel rounded-xl ambient-shadow',
        dark && 'glass-panel-dark',
        className
      )}
    >
      {children}
    </div>
  )
}
