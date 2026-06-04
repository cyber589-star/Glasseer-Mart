'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop', className)}>
      {children}
    </div>
  )
}
