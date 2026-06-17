'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  const allImages = images
  const hasMultiple = allImages.length > 1

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setCursorPos({ x, y })
  }

  const goTo = (dir: number) => {
    setSelected((prev) => (prev + dir + allImages.length) % allImages.length)
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        className="aspect-square bg-surface-bright rounded-3xl overflow-hidden flex items-center justify-center ambient-shadow-lg cursor-crosshair relative"
      >
        <Image
          src={allImages[selected]}
          alt={`${name} - View ${selected + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain mix-blend-multiply transition-transform duration-200 p-12"
          style={{
            transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
            transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
          }}
          priority
        />
        <span className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 text-white text-xs rounded-full font-sans z-10">
          {selected + 1} / {allImages.length}
        </span>
        {hasMultiple && (
          <>
            <button
              onClick={() => goTo(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-white hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-primary" />
            </button>
            <button
              onClick={() => goTo(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-white hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-primary" />
            </button>
          </>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-4">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center p-4 relative ${
                i === selected ? 'border-primary ambient-shadow' : 'border-transparent bg-surface-container-low'
              }`}
            >
              <Image src={img} alt={`${name} - Thumbnail ${i + 1}`} fill sizes="80px" className="object-contain mix-blend-multiply" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
