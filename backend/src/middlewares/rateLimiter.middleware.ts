import rateLimit from 'express-rate-limit'
import { env } from '../config/env'

const errorBody = (message: string) => ({
  success: false,
  error: { code: 'TOO_MANY_REQUESTS', message, statusCode: 429 },
})

export const generalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('Too many requests, please try again later.'),
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.AUTH_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: errorBody('Too many auth attempts, try again in 15 minutes.'),
})

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('Too many password reset requests. Try again in 1 hour.'),
})
