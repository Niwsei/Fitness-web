import { Prisma } from '@prisma/client'
import { prisma } from '../config/database'
import { ProductQueryInput } from '../schemas/product.schema'
import { parsePagination } from '../utils/pagination.util'

export const productRepository = {
  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id, isActive: true },
      include: {
        category: true,
        variants: { where: { isActive: true }, orderBy: { name: 'asc' } },
        images: { orderBy: { sortOrder: 'asc' } },
        _count: { select: { reviews: { where: { isApproved: true } } } },
      },
    })
  },

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        category: true,
        variants: { where: { isActive: true }, orderBy: { name: 'asc' } },
        images: { orderBy: { sortOrder: 'asc' } },
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { firstName: true, lastName: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })
  },

  async findMany(query: ProductQueryInput) {
    const { page, limit, skip, sortOrder } = parsePagination(query)

    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(query.categoryId && { categoryId: query.categoryId }),
      ...(query.brand && { brand: { contains: query.brand, mode: 'insensitive' } }),
      ...(query.isFeatured !== undefined && { isFeatured: query.isFeatured }),
      ...(query.fitnessGoal && { fitnessGoals: { has: query.fitnessGoal } }),
      ...((query.minPrice !== undefined || query.maxPrice !== undefined) && {
        price: {
          ...(query.minPrice !== undefined && { gte: query.minPrice }),
          ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
        },
      }),
      ...(query.q && {
        OR: [
          { name: { contains: query.q, mode: 'insensitive' } },
          { description: { contains: query.q, mode: 'insensitive' } },
          { brand: { contains: query.q, mode: 'insensitive' } },
          { tags: { has: query.q } },
        ],
      }),
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      query.sortBy === 'price' ? { price: sortOrder } :
      query.sortBy === 'name' ? { name: sortOrder } :
      { createdAt: sortOrder }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where, orderBy, skip, take: limit,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: { where: { isPrimary: true }, take: 1 },
          variants: { where: { isActive: true }, select: { id: true, name: true, stockQuantity: true } },
        },
      }),
      prisma.product.count({ where }),
    ])

    return { products, total, page, limit }
  },

  create: (data: Prisma.ProductCreateInput) => prisma.product.create({ data }),
  update: (id: string, data: Prisma.ProductUpdateInput) => prisma.product.update({ where: { id }, data }),
  softDelete: (id: string) => prisma.product.update({ where: { id }, data: { isActive: false } }),
  existsBySku: async (sku: string, excludeId?: string): Promise<boolean> =>
    (await prisma.product.count({ where: { sku, ...(excludeId && { id: { not: excludeId } }) } })) > 0,
  existsBySlug: async (slug: string, excludeId?: string): Promise<boolean> =>
    (await prisma.product.count({ where: { slug, ...(excludeId && { id: { not: excludeId } }) } })) > 0,
}
