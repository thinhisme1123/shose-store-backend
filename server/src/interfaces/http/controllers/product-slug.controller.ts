import { Request, Response } from "express"
import { GetProductBySlug } from "../../../application/use-cases/get-product-by-slug"
import { ProductRepo } from "../../../infrastructure/repositories/product.repository"

const repo = new ProductRepo()
const getProductBySlug = new GetProductBySlug(repo)

export async function productSlugController(req: Request, res: Response) {
  try {
    const product = await getProductBySlug.execute(req.params.slug)
    if (!product) return res.status(404).json({ error: "Product not found" })
    return res.json(product)
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}
