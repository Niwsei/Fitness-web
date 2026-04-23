import { Router } from 'express'
import healthRoutes from './health.routes'
import authRoutes from './auth.routes'
import productRoutes from './product.routes'

const router = Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/products', productRoutes)
// router.use('/categories', categoryRoutes)
// router.use('/cart', cartRoutes)
// router.use('/orders', orderRoutes)

export default router
