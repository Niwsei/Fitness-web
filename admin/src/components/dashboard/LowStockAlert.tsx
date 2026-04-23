'use client'
import { useQuery } from '@tanstack/react-query'
import { AlertTriangle } from 'lucide-react'
import { get } from '@/lib/api'

interface LowStockItem {
  id: string
  productName: string
  variantName: string
  stockQuantity: number
  lowStockAlert: number
}

export function LowStockAlert() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'inventory', 'low-stock'],
    queryFn: () => get<LowStockItem[]>('/admin/inventory/low-stock'),
  })

  const items = data?.data ?? []

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-4 w-4 text-orange-500" />
        <h3 className="font-semibold text-gray-900">Low Stock</h3>
        {items.length > 0 && (
          <span className="ml-auto text-xs font-medium bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
            {items.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-50 rounded animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">All stock levels are healthy.</p>
      ) : (
        <div className="space-y-2">
          {items.slice(0, 8).map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                <p className="text-xs text-gray-500 truncate">{item.variantName}</p>
              </div>
              <span className={`text-sm font-bold shrink-0 ml-2 ${item.stockQuantity === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                {item.stockQuantity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
