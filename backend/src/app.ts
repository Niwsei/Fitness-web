import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { env } from './config/env'
import { requestLogger } from './middlewares/requestLogger.middleware'
import { generalLimiter } from './middlewares/rateLimiter.middleware'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { notFound } from './middlewares/notFound.middleware'
import routes from './routes'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(cors({
    origin: [env.FRONTEND_URL, env.ADMIN_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  app.use(cookieParser())
  app.use(requestLogger)
  app.use(generalLimiter)
  app.use(env.API_PREFIX, routes)
  app.use(notFound)
  app.use(errorHandler)

  return app
}
