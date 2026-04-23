// ─── Auth ─────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN'
  fitnessGoal?: 'MUSCLE_GAIN' | 'WEIGHT_LOSS' | 'ENDURANCE' | 'MAINTENANCE'
  createdAt: string
  updatedAt: string
}

// ─── Product ──────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
}

export interface ProductVariant {
  id: string
  sku: string
  name: string
  priceModifier: number
  stockQuantity: number
  lowStockAlert: number
  isActive: boolean
}

export interface ProductImage {
  id: string
  url: string
  altText?: string
  sortOrder: number
  isPrimary: boolean
}

export interface Product {
  id: string
  sku: string
  name: string
  slug: string
  description?: string
  shortDesc?: string
  category: Category
  brand?: string
  price: number
  comparePrice?: number
  weightGrams?: number
  isActive: boolean
  isFeatured: boolean
  fitnessGoals: string[]
  tags: string[]
  variants: ProductVariant[]
  images: ProductImage[]
  createdAt: string
  updatedAt: string
}

// ─── Order ────────────────────────────────────────────────────

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export interface OrderItem {
  id: string
  productName: string
  variantName?: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  subtotal: number
  shippingFee: number
  discountAmount: number
  taxAmount: number
  total: number
  currency: string
  shippingAddress: ShippingAddress
  trackingNumber?: string
  items: OrderItem[]
  createdAt: string
}

export interface ShippingAddress {
  fullName: string
  street: string
  city: string
  province?: string
  country: string
  postalCode?: string
  phone?: string
}

// ─── API ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  meta?: PaginationMeta
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    statusCode: number
    details?: Record<string, string[]>
  }
}
