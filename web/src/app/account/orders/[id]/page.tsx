'use client'
import { use } from 'react'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const STATUS_STEPS = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED']
const STATUS_LAO: Record<string, string> = {
  PENDING: 'ລໍຖ້າ', CONFIRMED: 'ຢືນຢັນ', PROCESSING: 'ດຳເນີນ', SHIPPED: 'ຈັດສົ່ງ', DELIVERED: 'ໄດ້ຮັບ',
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders', id],
    queryFn: () => get<{ order: any }>(`/orders/${id}`),
    enabled: !!id,
  })
  const order = (data as any)?.data?.order

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">ບໍ່ພົບການສັ່ງຊື້ນີ້.</p>
        <Button asChild variant="outline"><Link href="/account?tab=orders">ກັບໄປການສັ່ງຊື້</Link></Button>
      </div>
    )
  }

  const currentStep = STATUS_STEPS.indexOf(order.status)

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/account?tab=orders" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> ກັບໄປການສັ່ງຊື້
      </Link>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">ການສັ່ງຊື້ #{order.orderNumber ?? id.slice(0, 8).toUpperCase()}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ສັ່ງໃນວັນທີ {new Date(order.createdAt).toLocaleDateString('lo-LA', { dateStyle: 'long' })}
          </p>
        </div>
        <Badge variant={order.status === 'DELIVERED' ? 'success' : order.status === 'CANCELLED' ? 'destructive' : 'default'}>
          {STATUS_LAO[order.status] ?? order.status}
        </Badge>
      </div>

      {order.status !== 'CANCELLED' && (
        <div className="rounded-xl border bg-card p-5 mb-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-muted" />
            {STATUS_STEPS.slice(0, 5).map((step, i) => (
              <div key={step} className="relative flex flex-col items-center gap-2 z-10">
                <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${i <= currentStep ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-muted-foreground/50'}`}>
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <span className="text-xs text-muted-foreground text-center hidden sm:block">
                  {STATUS_LAO[step] ?? step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-card p-5 mb-6 space-y-4">
        <h2 className="font-semibold">ລາຍການສິນຄ້າ</h2>
        <Separator />
        {order.items?.map((item: any) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {item.imageUrl
                ? <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                : <div className="h-full flex items-center justify-center text-2xl text-muted-foreground/30">🏋️</div>
              }
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{item.productName}</p>
              <p className="text-xs text-muted-foreground">{item.variantName} · ຈຳນວນ: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <Separator />
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">ລວມກ່ອນສ່ວນຫຼຸດ</span><span>${Number(order.subtotal ?? order.total).toFixed(2)}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-primary"><span>ສ່ວນຫຼຸດ</span><span>−${Number(order.discount).toFixed(2)}</span></div>}
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>ລວມທັງໝົດ</span>
          <span className="text-primary">${Number(order.total).toFixed(2)}</span>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" /> ທີ່ຢູ່ຈັດສົ່ງ
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
            {order.shippingAddress.addressLine1}{order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
            {order.shippingAddress.country}
          </p>
        </div>
      )}
    </div>
  )
}
