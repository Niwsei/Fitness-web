import { Response } from 'express'
import { PaginationMeta } from '../types/common.types'

export function sendSuccess<T>(res: Response, data: T, message?: string, statusCode = 200, meta?: PaginationMeta): Response {
  return res.status(statusCode).json({ success: true, message, data, ...(meta && { meta }) })
}

export function sendCreated<T>(res: Response, data: T, message?: string): Response {
  return sendSuccess(res, data, message, 201)
}

export function sendNoContent(res: Response): Response {
  return res.status(204).send()
}

export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit)
  return { page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 }
}
