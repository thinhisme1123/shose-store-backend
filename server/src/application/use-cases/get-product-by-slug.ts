import { IProductRepo } from "../../domain/repositories/IProductRepo"

export class GetProductBySlug {
  constructor(private repo: IProductRepo) {}

  async execute(slug: string) {
    return this.repo.findBySlug(slug)
  }
}
