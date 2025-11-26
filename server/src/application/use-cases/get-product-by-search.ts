import { IProductRepo } from "../../domain/repositories/product.interface"

export class GetProductBySearch {
  constructor(private repo: IProductRepo) {}

  async execute(keyWord: string) {
    return this.repo.searchByKeyword(keyWord)
  }
}
