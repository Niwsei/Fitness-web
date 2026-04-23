'use client'
import { useQuery } from '@tanstack/react-query'
import { AlertTriangle } from 'lucide-react'
import { get } from '@/lib/api'
import { cn } from '@/lib/cn'

export function InventoryTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'inventory'],
    queryFn: () => get('/admin/inventory'),
  })

  const items = (data?.data as { id: string; sku: string; productName: string; variantName: string; stockQuantity: number; lowStockAlert: number }[] | undefined) ?? []

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {['SKU', 'Product', 'Variant', 'Stock', 'Alert Threshold', 'Status'].map((h) => (
              <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(10)].map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            : items.map((item) => {
                const isLow = item.stockQuantity <= item.lowStockAlert
                const isOut = item.stockQuantity === 0
                return (
                  <tr key={item.id} className={cn('border-b border-gray-50 hover:bg-gray-50', isLow && 'bg-orange-50/30')}>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{item.sku}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.productName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.variantName}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{item.stockQuantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.lowStockAlert}</td>
                    <td className="px-4 py-3">
                      {isOut ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full w-fit">
                          <AlertTriangle className="h-3 w-3" />Out of stock
                        </span>
                      ) : isLow ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full w-fit">
                          <AlertTriangle className="h-3 w-3" />Low stock
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">In stock</span>
                      )}
                    </td>
                  </tr>
                )
              })}
        </tbody>
      </table>
    </div>
  )
}
