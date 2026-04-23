import { createApp } from './app'
import { env } from './config/env'
import { connectDatabase, disconnectDatabase } from './config/database'
import { logger } from './config/logger'

async function bootstrap() {
  await connectDatabase()
  logger.info('✅ Database connected')

  const app = createApp()
  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 Backend running → http://localhost:${env.PORT}${env.API_PREFIX}`)
  })

  const shutdown = async (signal: string) => {
    logger.info(`${signal} — shutting down...`)
    server.close(async () => {
      await disconnectDatabase()
      process.exit(0)
    })
    setTimeout(() => process.exit(1), 10_000)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('unhandledRejection', (r) => { logger.error('Unhandled rejection:', r); process.exit(1) })
  process.on('uncaughtException', (e) => { logger.error('Uncaught exception:', e); process.exit(1) })
}

bootstrap().catch((e) => { console.error(e); process.exit(1) })
