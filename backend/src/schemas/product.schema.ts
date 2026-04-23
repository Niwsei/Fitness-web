import { z } from 'zod'

export const createProductSchema = z.object({
  sku: z.string().min(1).max(100),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  shortDesc: z.string().max(500).optional(),
  categoryId: z.string().uuid(),
  brand: z.string().max(100).optional(),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  weightGrams: z.number().positive().optional(),
  isFeatured: z.boolean().default(false),
  fitnessGoals: z.array(z.enum(['MUSCLE_GAIN', 'WEIGHT_LOSS', 'ENDURANCE', 'MAINTENANCE'])).default([]),
  tags: z.array(z.string()).default([]),
})

export const updateProductSchema = createProductSchema.partial()

export const productQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
  categoryId: z.string().uuid().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  fitnessGoal: z.enum(['MUSCLE_GAIN', 'WEIGHT_LOSS', 'ENDURANCE', 'MAINTENANCE']).optional(),
  isFeatured: z.string().transform((v) => v === 'true').optional(),
  sortBy: z.enum(['price', 'name', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  q: z.string().optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ProductQueryInput = z.infer<typeof productQuerySchema>
