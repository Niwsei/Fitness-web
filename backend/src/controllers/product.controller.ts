import { Request, Response } from 'express'
import { productService } from '../services/product.service'
import { sendSuccess, sendCreated, sendNoContent } from '../utils/response.util'
import type { ProductQueryInput } from '../schemas/product.schema'

export const productController = {
  async getProducts(req: Request, res: Response) {
    const { products, meta } = await productService.getProducts(req.query as unknown as ProductQueryInput)
    sendSuccess(res, { products }, undefined, 200, meta)
  },

  async getProductBySlug(req: Request, res: Response) {
    const product = await productService.getProductBySlug(req.params.slug)
    sendSuccess(res, { product })
  },

  async createProduct(req: Request, res: Response) {
    const product = await productService.createProduct(req.body)
    sendCreated(res, { product }, 'Product created successfully')
  },

  async updateProduct(req: Request, res: Response) {
    const product = await productService.updateProduct(req.params.id, req.body)
    sendSuccess(res, { product }, 'Product updated successfully')
  },

  async deleteProduct(req: Request, res: Response) {
    await productService.deleteProduct(req.params.id)
    sendNoContent(res)
  },
}
