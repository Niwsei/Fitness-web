import { Router } from 'express'
import { Role } from '@prisma/client'
import { z } from 'zod'
import { productController } from '../controllers/product.controller'
import { validate } from '../middlewares/validate.middleware'
import { authenticate, authorize } from '../middlewares/auth.middleware'
import { asyncHandler } from '../utils/asyncHandler.util'
import { createProductSchema, updateProductSchema, productQuerySchema } from '../schemas/product.schema'

const router = Router()
const idParam = z.object({ id: z.string().uuid() })
const slugParam = z.object({ slug: z.string().min(1) })

router.get('/', validate({ query: productQuerySchema }), asyncHandler(productController.getProducts))
router.get('/:slug', validate({ params: slugParam }), asyncHandler(productController.getProductBySlug))
router.post('/', authenticate, authorize(Role.ADMIN, Role.STAFF), validate({ body: createProductSchema }), asyncHandler(productController.createProduct))
router.patch('/:id', authenticate, authorize(Role.ADMIN, Role.STAFF), validate({ params: idParam, body: updateProductSchema }), asyncHandler(productController.updateProduct))
router.delete('/:id', authenticate, authorize(Role.ADMIN), validate({ params: idParam }), asyncHandler(productController.deleteProduct))

export default router
