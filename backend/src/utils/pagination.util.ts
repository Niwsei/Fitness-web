import { PaginationQuery } from '../types/common.types'

export function parsePagination(query: PaginationQuery) {
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20))
  const skip = (page - 1) * limit
  const sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc'
  const sortBy = query.sortBy ?? 'createdAt'
  return { page, limit, skip, sortBy, sortOrder }
}
