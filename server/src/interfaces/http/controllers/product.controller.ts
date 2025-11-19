import { Request, Response } from "express"
import { GetProductsByCollection } from "../../../application/use-cases/get-product-by-collection"
import { ProductRepo } from "../../../infrastructure/repositories/product.repository"
import { GetProductBySlug } from "../../../application/use-cases/get-product-by-slug"
import { GetProductBySearch } from "../../../application/use-cases/get-product-by-search"
import { GetAllProducts } from "../../../application/use-cases/get-all-product"

const repo = new ProductRepo()
const getProductsByCollection = new GetProductsByCollection(repo)
const getProductBySlug = new GetProductBySlug(repo)
const getProductBySearch = new GetProductBySearch(repo)
const getAllProduct = new GetAllProducts(repo)

export async function productCollectionController(req: Request, res: Response) {
  try {
    const products = await getProductsByCollection.execute(req.params.collection)
    res.json( products )
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export async function productSlugController(req: Request, res: Response) {
  try {
    const product = await getProductBySlug.execute(req.params.slug)
    if (!product) return res.status(404).json({ error: "Product not found" })
    return res.json(product)
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export async function productSearchController(req: Request, res: Response) {
  try {
    const { q } = req.query
    const keyword = q ? String(q).trim() : ""

    const product = await getProductBySearch.execute(keyword)
    if (!product) return res.status(404).json({ error: "Product not found" })
    return res.json(product)
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export async function getAllProductController(req: Request, res: Response) {
  try {
  const product = await getAllProduct.execute()
    return res.json({data: product})
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}


