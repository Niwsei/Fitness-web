import { Router } from 'express'
import { prisma } from '../config/database'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ success: true, data: { status: 'healthy', uptime: process.uptime(), db: 'connected' } })
  } catch {
    res.status(503).json({ success: false, data: { status: 'unhealthy', db: 'disconnected' } })
  }
})

export default router
