import { Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { validate } from '../middlewares/validate.middleware'
import { authenticate } from '../middlewares/auth.middleware'
import { authLimiter, passwordResetLimiter } from '../middlewares/rateLimiter.middleware'
import { asyncHandler } from '../utils/asyncHandler.util'
import { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema } from '../schemas/auth.schema'

const router = Router()

router.post('/register', authLimiter, validate({ body: registerSchema }), asyncHandler(authController.register))
router.post('/login', authLimiter, validate({ body: loginSchema }), asyncHandler(authController.login))
router.post('/refresh', asyncHandler(authController.refresh))
router.post('/forgot-password', passwordResetLimiter, validate({ body: forgotPasswordSchema }),
  asyncHandler(async (_req, res) => res.json({ success: true, message: 'If this email exists, a reset link has been sent.' }))
)
router.post('/logout', authenticate, asyncHandler(authController.logout))
router.get('/me', authenticate, asyncHandler(authController.getProfile))
router.patch('/change-password', authenticate, validate({ body: changePasswordSchema }), asyncHandler(authController.changePassword))

export default router
