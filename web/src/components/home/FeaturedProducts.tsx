'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard, type ProductCardData } from '@/components/products/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'

export function FeaturedProducts() {
  const { data, isLoading } = useProducts({ limit: 8 })
  const products: ProductCardData[] = (data as any)?.data?.products ?? []

  return (
    <section className="py-14 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black">ສິນຄ້າແນະນຳ</h2>
            <p className="text-muted-foreground text-sm mt-0.5">ຂາຍດີທີ່ສຸດ ປະຈຳອາທິດ</p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            ທັງໝົດ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
