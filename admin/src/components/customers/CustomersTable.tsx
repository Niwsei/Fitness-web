'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { get } from '@/lib/api'

export function CustomersTable() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'customers', page],
    queryFn: () => get(`/admin/customers?page=${page}&limit=20`),
  })

  const customers = (data?.data as { id: string; email: string; firstName: string; lastName: string; fitnessGoal?: string; createdAt: string }[] | undefined) ?? []
  const meta = data?.meta

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {['Name', 'Email', 'Fitness Goal', 'Joined', ''].map((h) => (
              <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(10)].map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            : customers.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-sm font-medium">
                        {c.firstName[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{c.firstName} {c.lastName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.email}</td>
                  <td className="px-4 py-3">
                    {c.fitnessGoal ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        {c.fitnessGoal.replace('_', ' ')}
                      </span>
                    ) : <span className="text-gray-400 text-sm">—</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-green-600 hover:underline font-medium">View</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {meta && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">{meta.total} customers</p>
          <div className="flex gap-2">
            <button disabled={!meta.hasPrev} onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Previous</button>
            <button disabled={!meta.hasNext} onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
