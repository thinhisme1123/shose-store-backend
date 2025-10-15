import { Request, Response } from "express"
import { GetProductsByCollection } from "../../../application/use-cases/get-product-by-collection"
import { ProductRepo } from "../../../infrastructure/repositories/product.repository"

const repo = new ProductRepo()
const getProductsByCollection = new GetProductsByCollection(repo)

export async function productCollectionController(req: Request, res: Response) {
  try {
    const products = await getProductsByCollection.execute(req.params.collection)
    res.json({ collection: req.params.collection, products })
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}
