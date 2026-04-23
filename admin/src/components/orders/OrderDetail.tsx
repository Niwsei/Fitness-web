'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, patch } from '@/lib/api'
import { cn } from '@/lib/cn'
import { useState } from 'react'

const STATUS_OPTIONS = ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-indigo-100 text-indigo-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export function OrderDetail({ orderId }: { orderId: string }) {
  const queryClient = useQueryClient()
  const [newStatus, setNewStatus] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'orders', orderId],
    queryFn: () => get<Record<string, unknown>>(`/admin/orders/${orderId}`),
  })

  const updateStatus = useMutation({
    mutationFn: (body: object) => patch(`/admin/orders/${orderId}/status`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders', orderId] })
      setNewStatus('')
    },
  })

  const order = data?.data as Record<string, unknown> | undefined

  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-green-500 border-t-transparent rounded-full" /></div>
  if (!order) return <p className="text-gray-500">Order not found.</p>

  const addr = order.shippingAddress as Record<string, string>

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber as string}</h1>
          <p className="text-sm text-gray-500 mt-1">{new Date(order.createdAt as string).toLocaleString()}</p>
        </div>
        <span className={cn('px-3 py-1.5 text-sm font-medium rounded-full', statusColors[order.status as string] ?? 'bg-gray-100 text-gray-800')}>
          {order.status as string}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
          <p className="text-sm text-gray-700">{addr?.fullName}</p>
          <p className="text-sm text-gray-600">{addr?.street}</p>
          <p className="text-sm text-gray-600">{addr?.city}, {addr?.country}</p>
          {addr?.phone && <p className="text-sm text-gray-600 mt-1">{addr.phone}</p>}
        </div>

        {/* Update Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select new status...</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Tracking number (optional)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button
            disabled={!newStatus || updateStatus.isPending}
            onClick={() => updateStatus.mutate({ status: newStatus, trackingNumber: trackingNumber || undefined })}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors">
            {updateStatus.isPending ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="flex justify-between text-sm border-t border-gray-100 pt-3 font-bold text-gray-900">
          <span>Total</span>
          <span>${Number(order.total).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
