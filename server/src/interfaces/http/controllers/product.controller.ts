import { Request, Response } from "express";
import { GetProductsByCollection } from "../../../application/use-cases/product/get-product-by-collection.usecase";
import { ProductRepo } from "../../../infrastructure/repositories/product.repository";
import { GetProductBySlug } from "../../../application/use-cases/product/get-product-by-slug.usecase";
import { GetProductBySearch } from "../../../application/use-cases/product/get-product-by-search.usecase";
import { GetAllProducts } from "../../../application/use-cases/product/get-all-product.usecase";
import { UpdateProductById } from "../../../application/use-cases/product/update-product-by-id.usecase";
import { CreateProduct } from "../../../application/use-cases/product/create-product.usecase";
import { DeleteProduct } from "../../../application/use-cases/product/delete-product.usecase";
import { GetProductById } from "../../../application/use-cases/product/get-product-by-id.usecase";

const repo = new ProductRepo();
const getProductsByCollection = new GetProductsByCollection(repo);
const getProductBySlug = new GetProductBySlug(repo);
const getProductBySearch = new GetProductBySearch(repo);
const getAllProduct = new GetAllProducts(repo);
const updateProductById = new UpdateProductById(repo);
const getProductById = new GetProductById(repo);
const createProduct = new CreateProduct(repo);
const deleteProduct = new DeleteProduct(repo);

export async function productCollectionController(req: Request, res: Response) {
  try {
    const products = await getProductsByCollection.execute(
      req.params.collection
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function productSlugController(req: Request, res: Response) {
  try {
    const product = await getProductBySlug.execute(req.params.slug);
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function productSearchController(req: Request, res: Response) {
  try {
    const { q } = req.query;
    const keyword = q ? String(q).trim() : "";

    const product = await getProductBySearch.execute(keyword);
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAllProductController(req: Request, res: Response) {
  try {
    const product = await getAllProduct.execute();
    return res.json({ data: product });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedPro = await updateProductById.execute(id, req.body);

    if (!updatedPro) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", data: updatedPro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createNewProductController(req: Request, res: Response) {
  try {
    const createPro = await createProduct.execute(req.body);
    res.status(201).json({ message: "Product Created Successfully!", data: createPro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteProductController(req: Request, res: Response) {
  try {
    const deletePro = await deleteProduct.execute(req.params.id);

    if (!deletePro) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getProductByIdController(req: Request, res: Response) {
  try {
    const product = await getProductById.execute(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
