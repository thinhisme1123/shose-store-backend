import { Product } from "../entities/product";

export interface IProductRepo {
  findBySlug(slug: string): Promise<Product | null>
  findByCategory(category: string): Promise<Product[]>
  findByGender(gender: string): Promise<Product[]>
  searchByKeyword(keyWord: string): Promise<Product[]>
}
