import { Review } from "../../../domain/entities/review"
import { IReviewRepository } from "../../../domain/repositories/review.repository"

// domain/usecases/review/create-review.ts
export class CreateReview {
  constructor(private readonly repo: IReviewRepository) {}

  execute(data: Review) {
    if (data.rating < 1 || data.rating > 5) {
      throw new Error("Invalid rating")
    }
    return this.repo.create(data)
  }
}
