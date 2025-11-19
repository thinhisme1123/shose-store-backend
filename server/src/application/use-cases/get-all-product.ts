import { IProductRepo } from "../../domain/repositories/IProductRepo.js"

export class GetAllProducts {
  constructor(private repo: IProductRepo) {}

  async execute() {
    return this.repo.findAll()
  }
}
