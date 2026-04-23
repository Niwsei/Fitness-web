import type { Metadata } from 'next'
import { ProductsTable } from '@/components/products/ProductsTable'

export const metadata: Metadata = { title: 'Products' }

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your supplement catalog.</p>
      </div>
      <ProductsTable />
    </div>
  )
}
