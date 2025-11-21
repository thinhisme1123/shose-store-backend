import { Product } from "../../domain/entities/product.js"
import { IProductRepo } from "../../domain/repositories/IProductRepo.js"

export class DeleteProduct {
  constructor(private repo: IProductRepo) {}

  async execute(id: string) {
    return this.repo.deleteProduct(id)
  }
}
