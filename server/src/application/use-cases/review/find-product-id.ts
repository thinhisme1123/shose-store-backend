import { IReviewRepository } from "../../../domain/repositories/review.repository"

// domain/usecases/review/create-review.ts
export class FindByProductReview {
  constructor(private readonly repo: IReviewRepository) {}

  execute(productId: string) {
    return this.repo.findByProduct(productId)
  }
}
