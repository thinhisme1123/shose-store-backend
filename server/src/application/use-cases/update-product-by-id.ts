import { Product } from "../../domain/entities/product.js"
import { IProductRepo } from "../../domain/repositories/product.interface.js"

export class UpdateProductById {
  constructor(private repo: IProductRepo) {}

  async execute(id: string, newData: Product) {
    return this.repo.updateProductById(id, newData)
  }
}
