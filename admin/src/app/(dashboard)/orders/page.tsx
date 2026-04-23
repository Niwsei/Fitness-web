import type { Metadata } from 'next'
import { OrdersTable } from '@/components/orders/OrdersTable'

export const metadata: Metadata = { title: 'Orders' }

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders.</p>
      </div>
      <OrdersTable />
    </div>
  )
}
