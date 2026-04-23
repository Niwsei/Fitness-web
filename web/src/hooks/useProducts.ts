'use client'

import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/api'
import { getMockProduct, getMockProducts } from '@/lib/mockData'

interface ProductQuery {
  page?: number
  limit?: number
  category?: string
  categoryId?: string
  q?: string
  fitnessGoal?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  minPrice?: number
  maxPrice?: number
}

export function useProducts(query: ProductQuery = {}) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: async () => {
      try {
        return await get('/products', query)
      } catch {
        return getMockProducts(query as any)
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['products', slug],
    queryFn: async () => {
      try {
        return await get(`/products/${slug}`)
      } catch {
        return getMockProduct(slug)
      }
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}
