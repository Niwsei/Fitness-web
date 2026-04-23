import morgan, { StreamOptions } from 'morgan'
import { logger } from '../config/logger'
import { env } from '../config/env'

const stream: StreamOptions = { write: (msg: string) => logger.http(msg.trim()) }
const skip = () => env.NODE_ENV === 'test'

export const requestLogger = morgan(
  env.NODE_ENV === 'production'
    ? ':remote-addr :method :url :status :res[content-length] - :response-time ms'
    : ':method :url :status :response-time ms',
  { stream, skip },
)
