import type { Metadata } from 'next'
import { OrderDetail } from '@/components/orders/OrderDetail'

export const metadata: Metadata = { title: 'Order Detail' }

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetail orderId={params.id} />
}
