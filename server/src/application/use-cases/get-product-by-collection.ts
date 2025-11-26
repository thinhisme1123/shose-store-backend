import { IProductRepo } from "../../domain/repositories/product.interface.js"

export class GetProductsByCollection {
  constructor(private repo: IProductRepo) {}

  async execute(collection: string) {
    const genderValues = ["men", "women"]
    if (genderValues.includes(collection.toLowerCase())) {
      return this.repo.findByGender(collection)
    } else {
      return this.repo.findByCategory(collection)
    }
  }
}
