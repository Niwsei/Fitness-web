import type { Metadata } from 'next'
import { InventoryTable } from '@/components/inventory/InventoryTable'

export const metadata: Metadata = { title: 'Inventory' }

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor stock levels and manage adjustments.</p>
      </div>
      <InventoryTable />
    </div>
  )
}
