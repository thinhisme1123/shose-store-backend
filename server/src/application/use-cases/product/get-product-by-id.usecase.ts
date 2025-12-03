import { IProductRepo } from "../../../domain/repositories/product.interface"

export class GetProductById {
  constructor(private repo: IProductRepo) {}

  async execute(id: string) {
    return this.repo.findById(id)
  }
}
