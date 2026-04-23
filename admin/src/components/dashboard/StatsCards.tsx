'use client'
import { useQuery } from '@tanstack/react-query'
import { TrendingUp, ShoppingCart, Users, Package } from 'lucide-react'
import { get } from '@/lib/api'
import { cn } from '@/lib/cn'

interface Stats {
  todayRevenue: number
  todayOrders: number
  totalCustomers: number
  lowStockCount: number
  revenueChange: number
  ordersChange: number
}

const cards = [
  {
    key: 'todayRevenue' as const,
    label: "Today's Revenue",
    icon: TrendingUp,
    color: 'text-green-600',
    bg: 'bg-green-50',
    format: (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
  },
  {
    key: 'todayOrders' as const,
    label: "Today's Orders",
    icon: ShoppingCart,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    format: (v: number) => v.toString(),
  },
  {
    key: 'totalCustomers' as const,
    label: 'Total Customers',
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: 'lowStockCount' as const,
    label: 'Low Stock Items',
    icon: Package,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    format: (v: number) => v.toString(),
  },
]

export function StatsCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: () => get<Stats>('/admin/dashboard/stats'),
    refetchInterval: 60_000,
  })

  const stats = data?.data

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, color, bg, format }) => (
        <div key={key} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <div className={cn('p-2 rounded-lg', bg)}>
              <Icon className={cn('h-5 w-5', color)} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {isLoading ? (
              <span className="inline-block h-7 w-24 bg-gray-100 rounded animate-pulse" />
            ) : (
              format(stats?.[key] ?? 0)
            )}
          </p>
        </div>
      ))}
    </div>
  )
}
