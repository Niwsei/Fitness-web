import slugify from 'slugify'
import { productRepository } from '../repositories/product.repository'
import { NotFoundError, ConflictError } from '../errors'
import { buildPaginationMeta } from '../utils/response.util'
import type { CreateProductInput, UpdateProductInput, ProductQueryInput } from '../schemas/product.schema'

export const productService = {
  async getProducts(query: ProductQueryInput) {
    const { products, total, page, limit } = await productRepository.findMany(query)
    return { products, meta: buildPaginationMeta(total, page, limit) }
  },

  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug)
    if (!product) throw new NotFoundError('Product')
    return product
  },

  async getProductById(id: string) {
    const product = await productRepository.findById(id)
    if (!product) throw new NotFoundError('Product')
    return product
  },

  async createProduct(input: CreateProductInput) {
    if (await productRepository.existsBySku(input.sku)) throw new ConflictError(`SKU '${input.sku}' already exists`)
    let slug = slugify(input.name, { lower: true, strict: true })
    if (await productRepository.existsBySlug(slug)) slug = `${slug}-${Date.now()}`
    return productRepository.create({ ...input, slug, category: { connect: { id: input.categoryId } } })
  },

  async updateProduct(id: string, input: UpdateProductInput) {
    await productService.getProductById(id)
    if (input.sku && (await productRepository.existsBySku(input.sku, id))) {
      throw new ConflictError(`SKU '${input.sku}' already in use`)
    }
    return productRepository.update(id, {
      ...input,
      ...(input.categoryId && { category: { connect: { id: input.categoryId } } }),
    })
  },

  async deleteProduct(id: string) {
    await productService.getProductById(id)
    await productRepository.softDelete(id)
  },
}
