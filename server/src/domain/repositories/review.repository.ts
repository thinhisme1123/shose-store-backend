// domain/repositories/review.repository.ts
import { Review } from "../entities/review"

export interface IReviewRepository {
  create(data: Review): Promise<Review>
  findByProduct(productId: string): Promise<Review[]>
  deleteById(id: string, userId: string): Promise<void>
}
