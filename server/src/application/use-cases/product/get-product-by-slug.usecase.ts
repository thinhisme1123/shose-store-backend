import { IProductRepo } from "../../../domain/repositories/product.interface"

export class GetProductBySlug {
  constructor(private repo: IProductRepo) {}

  async execute(slug: string) {
    return this.repo.findBySlug(slug)
  }
}
