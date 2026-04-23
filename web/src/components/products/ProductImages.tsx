'use client'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/cn'

interface ProductImage {
  id: string
  url: string
  alt?: string
  isPrimary: boolean
}

export function ProductImages({ images, name }: { images: ProductImage[]; name: string }) {
  const primary = images.find((i) => i.isPrimary) ?? images[0]
  const [active, setActive] = useState(primary?.id ?? '')

  const activeImage = images.find((i) => i.id === active) ?? primary

  if (!images.length) {
    return (
      <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center text-7xl text-muted-foreground/30">
        🏋️
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
        <Image
          src={activeImage?.url ?? ''}
          alt={activeImage?.alt ?? name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setActive(img.id)}
              className={cn(
                'relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors',
                active === img.id ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30',
              )}
            >
              <Image src={img.url} alt={img.alt ?? name} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
