import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../errors/AppError'
import { logger } from '../config/logger'
import { env } from '../config/env'

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Validation failed', statusCode: 422, details: err.flatten().fieldErrors },
    })
    return
  }

  if (err instanceof AppError) {
    if (err.statusCode >= 500) logger.error('Server error', { error: err.message, stack: err.stack, path: req.path })
    res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message, statusCode: err.statusCode },
    })
    return
  }

  logger.error('Unhandled error', { error: err.message, stack: err.stack, path: req.path, method: req.method })
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
      statusCode: 500,
    },
  })
}
