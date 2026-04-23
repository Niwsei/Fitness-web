'use client'
import { cn } from '@/lib/cn'

interface Variant {
  id: string
  name: string
  price: number
  stock: number
}

interface Props {
  variants: Variant[]
  selected: string
  onSelect: (id: string) => void
}

export function VariantSelector({ variants, selected, onSelect }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Size / Flavor</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            disabled={variant.stock === 0}
            className={cn(
              'px-3 py-1.5 rounded-lg border text-sm font-medium transition-all',
              selected === variant.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-background hover:border-primary hover:text-primary',
              variant.stock === 0 && 'opacity-40 cursor-not-allowed line-through',
            )}
          >
            {variant.name}
            {variant.stock === 0 && <span className="ml-1 text-xs">(Out)</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
