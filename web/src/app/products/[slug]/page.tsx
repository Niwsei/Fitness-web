'use client'
import { use, useState } from 'react'
import { ShoppingCart, Star, Shield, Truck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useProduct } from '@/hooks/useProducts'
import { useCartStore } from '@/stores/cart.store'
import { toast } from '@/hooks/use-toast'
import { ProductImages } from '@/components/products/ProductImages'
import { VariantSelector } from '@/components/products/VariantSelector'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { data, isLoading, isError } = useProduct(slug)
  const product = (data as any)?.data?.product
  const { addItem, openCart } = useCartStore()
  const [selectedVariantId, setSelectedVariantId] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  const variants = product?.variants ?? []
  const selectedVariant = variants.find((v: any) => v.id === selectedVariantId) ?? variants[0]

  function handleAddToCart() {
    if (!selectedVariant || !product) return
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      quantity,
      imageUrl: product.images?.find((i: any) => i.isPrimary)?.url,
    })
    toast({ title: 'ເພີ່ມໃສ່ກະຕ່າແລ້ວ!', description: `${product.name} — ${selectedVariant.name}`, variant: 'success' })
    openCart()
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" /><Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" /><Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-muted-foreground mb-4">ບໍ່ພົບສິນຄ້ານີ້.</p>
        <Button asChild variant="outline"><Link href="/products">ກັບໄປສິນຄ້າ</Link></Button>
      </div>
    )
  }

  const inStock = selectedVariant ? selectedVariant.stock > 0 : false
  const price = selectedVariant?.price ?? product.basePrice

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> ກັບໄປສິນຄ້າ
      </Link>
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <ProductImages images={product.images ?? []} name={product.name} />
        <div className="space-y-6">
          <div>
            {product.category && <Badge variant="secondary" className="mb-2">{product.category.name}</Badge>}
            <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
            {product.brand && <p className="text-muted-foreground mt-1">ຍີ່ຫໍ້: {product.brand}</p>}
          </div>
          {product.rating !== undefined && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
              {product.reviewCount && <span className="text-sm text-muted-foreground">({product.reviewCount} ຄຳຕິຊົມ)</span>}
            </div>
          )}
          <div className="text-4xl font-extrabold text-primary">${price.toFixed(2)}</div>
          <Separator />
          {variants.length > 0 && (
            <VariantSelector
              variants={variants}
              selected={selectedVariantId || variants[0]?.id}
              onSelect={setSelectedVariantId}
            />
          )}
          <div className="space-y-2">
            <p className="text-sm font-medium">ຈຳນວນ</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors font-medium">−</button>
              <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(selectedVariant?.stock ?? 99, q + 1))} className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors font-medium">+</button>
              {selectedVariant && <span className="text-sm text-muted-foreground ml-2">{selectedVariant.stock} ຊິ້ນໃນສາງ</span>}
            </div>
          </div>
          <Button size="lg" className="w-full gap-2" disabled={!inStock} onClick={handleAddToCart}>
            <ShoppingCart className="h-5 w-5" />
            {inStock ? 'ເພີ່ມໃສ່ກະຕ່າ' : 'ໝົດສາງ'}
          </Button>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[{ icon: Truck, text: 'ຟຣີຄ່າສົ່ງເມື່ອຊື້ເກີນ $50' }, { icon: Shield, text: 'ຊຳລະເງິນທີ່ປອດໄພ' }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />{text}
              </div>
            ))}
          </div>
          {product.description && (
            <>
              <Separator />
              <div className="space-y-2">
                <h2 className="font-semibold">ລາຍລະອຽດ</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
