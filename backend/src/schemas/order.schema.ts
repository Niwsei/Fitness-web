import { z } from 'zod'

export const createOrderSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    province: z.string().optional(),
    country: z.string().length(2),
    postalCode: z.string().optional(),
    phone: z.string().optional(),
  }),
  paymentMethodId: z.string().min(1),
  discountCode: z.string().optional(),
  notes: z.string().max(500).optional(),
})

export const orderQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
  status: z.enum(['PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED']).optional(),
  paymentStatus: z.enum(['PENDING','PAID','FAILED','REFUNDED']).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const updateOrderStatusSchema = z.object({
  status: z.enum(['CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED']),
  trackingNumber: z.string().optional(),
  note: z.string().max(500).optional(),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>
