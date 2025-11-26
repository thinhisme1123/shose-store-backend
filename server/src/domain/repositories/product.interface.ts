import { Product } from "../entities/product";

export interface IProductRepo {
  findBySlug(slug: string): Promise<Product | null>
  findByCategory(category: string): Promise<Product[]>
  findByGender(gender: string): Promise<Product[]>
  findById(id: string): Promise<Product>
  searchByKeyword(keyWord: string): Promise<Product[]>
  findAll(): Promise<Product[]>
  updateProductById(id: string, newData: Product): Promise<Product>
  createProduct(data: Product): Promise<Product>
  deleteProduct(id: string): Promise<Product | null>
}
