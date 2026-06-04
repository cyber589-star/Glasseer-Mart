'use client'

import { useState, useRef } from 'react'

interface ProductGalleryProps {
  images: string[]
  name: string
  galleryImages?: string[]
}

export function ProductGallery({ images, name, galleryImages }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  const allImages = galleryImages || images

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setCursorPos({ x, y })
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        className="aspect-square bg-surface-bright rounded-3xl overflow-hidden flex items-center justify-center p-12 ambient-shadow-lg cursor-crosshair relative"
      >
        <img
          src={allImages[selected]}
          alt={`${name} - View ${selected + 1}`}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-200"
          style={{
            transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
            transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
          }}
        />
        <span className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 text-white text-xs rounded-full font-sans">
          {selected + 1} / {allImages.length}
        </span>
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-4">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center p-4 ${
                i === selected ? 'border-primary ambient-shadow' : 'border-transparent bg-surface-container-low'
              }`}
            >
              <img src={img} alt={`${name} - Thumbnail ${i + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
