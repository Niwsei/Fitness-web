'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { get } from '@/lib/api'
import { cn } from '@/lib/cn'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  status: string
  paymentStatus: string
  total: number
  createdAt: string
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-indigo-100 text-indigo-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
}

export function RecentOrders() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'orders', 'recent'],
    queryFn: () => get<Order[]>('/admin/orders?limit=8&sortOrder=desc'),
  })

  const orders = data?.data ?? []

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Recent Orders</h3>
        <Link href="/orders" className="text-sm text-green-600 hover:text-green-700 font-medium">
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Order', 'Customer', 'Status', 'Payment', 'Total', 'Date'].map((h) => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-5 py-3">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/orders/${order.id}`} className="text-sm font-medium text-green-600 hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-5 py-3">
                      <span className={cn('text-xs font-medium px-2 py-1 rounded-full', statusColors[order.status] ?? 'bg-gray-100 text-gray-800')}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={cn('text-xs font-medium px-2 py-1 rounded-full',
                        order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' :
                        order.paymentStatus === 'FAILED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800')}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-gray-900">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
