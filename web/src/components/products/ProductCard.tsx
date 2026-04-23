'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/stores/cart.store'
import { toast } from '@/hooks/use-toast'

export interface ProductCardData {
  id: string
  name: string
  slug: string
  basePrice: number
  images: Array<{ url: string; isPrimary: boolean }>
  variants: Array<{ id: string; name: string; price: number; stock: number }>
  category?: { name: string }
  brand?: string
  rating?: number
  reviewCount?: number
  isFeatured?: boolean
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const { addItem, openCart } = useCartStore()
  const image = product.images?.find((i) => i.isPrimary) ?? product.images?.[0]
  const defaultVariant = product.variants?.[0]
  const price = defaultVariant?.price ?? product.basePrice
  const inStock = defaultVariant ? defaultVariant.stock > 0 : true

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (!defaultVariant) return
    addItem({
      variantId: defaultVariant.id,
      productId: product.id,
      productName: product.name,
      variantName: defaultVariant.name,
      price: defaultVariant.price,
      quantity: 1,
      imageUrl: image?.url,
    })
    toast({ title: 'ເພີ່ມໃສ່ກະຕ່າ', description: product.name, variant: 'success' })
    openCart()
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-card border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">

        {/* Image */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-100 text-5xl opacity-30">🏋️</div>
          )}
          {product.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-orange-500 text-white border-0 text-[10px]">
              ຂາຍດີ
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1 gap-1">
          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
            {product.category?.name ?? product.brand}
          </p>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {product.rating !== undefined && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i <= Math.round(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground">({product.reviewCount?.toLocaleString()})</span>
            </div>
          )}

          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-lg font-black text-primary">${price.toFixed(2)}</span>
            <Button
              size="sm"
              disabled={!inStock}
              onClick={handleAddToCart}
              className="h-8 px-3 text-xs gap-1.5 bg-orange-500 hover:bg-orange-600 text-white border-0"
            >
              <ShoppingCart className="h-3 w-3" />
              {inStock ? 'ເພີ່ມ' : 'ໝົດ'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
