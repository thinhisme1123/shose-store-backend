import { Product } from "../../domain/entities/product.js"
import { IProductRepo } from "../../domain/repositories/IProductRepo.js"

export class CreateProduct {
  constructor(private repo: IProductRepo) {}

  async execute(data: Product) {
    return this.repo.createProduct(data)
  }
}
