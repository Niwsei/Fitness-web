import type { Metadata } from 'next'
import { CustomersTable } from '@/components/customers/CustomersTable'

export const metadata: Metadata = { title: 'Customers' }

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage your customer accounts.</p>
      </div>
      <CustomersTable />
    </div>
  )
}
