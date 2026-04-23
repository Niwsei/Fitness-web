'use client'
import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard, type ProductCardData } from '@/components/products/ProductCard'
import { ProductFilters } from '@/components/products/ProductFilters'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = {
    page: Number(searchParams.get('page') ?? 1),
    limit: 12,
    category: searchParams.get('category') ?? undefined,
    q: searchParams.get('q') ?? undefined,
    fitnessGoal: searchParams.get('fitnessGoal') ?? undefined,
    sortBy: searchParams.get('sortBy') ?? undefined,
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') ?? undefined,
  }

  const { data, isLoading, isError } = useProducts(query)
  const products: ProductCardData[] = (data as any)?.data?.products ?? []
  const meta = (data as any)?.meta

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">ສິນຄ້າທັງໝົດ</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {meta ? `ພົບ ${meta.total} ສິນຄ້າ` : 'ເບິ່ງຜະລິດຕະພັນທັງໝົດຂອງພວກເຮົາ'}
        </p>
      </div>

      <div className="mb-6">
        <ProductFilters />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-xl border overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">ໂຫຼດສິນຄ້າລົ້ມເຫຼວ. ກະລຸນາລອງໃໝ່.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl mb-2">🔍</p>
          <p className="font-medium">ບໍ່ພົບສິນຄ້າ</p>
          <p className="text-muted-foreground text-sm mt-1">ລອງປ່ຽນຕົວກອງ</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <Button
                variant="outline" size="sm" disabled={!meta.hasPrev}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.set('page', String(meta.page - 1))
                  router.push(`/products?${params.toString()}`)
                }}
              >ກ່ອນໜ້າ</Button>
              <span className="text-sm text-muted-foreground">ໜ້າ {meta.page} ຈາກ {meta.totalPages}</span>
              <Button
                variant="outline" size="sm" disabled={!meta.hasNext}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.set('page', String(meta.page + 1))
                  router.push(`/products?${params.toString()}`)
                }}
              >ຕໍ່ໄປ</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" /></div>}>
      <ProductsContent />
    </Suspense>
  )
}
