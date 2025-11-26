import { IProductRepo } from "../../domain/repositories/product.interface.js"

export class GetAllProducts {
  constructor(private repo: IProductRepo) {}

  async execute() {
    return this.repo.findAll()
  }
}
