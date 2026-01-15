// src/infrastructure/repositories/review.repository.impl.ts
import { IReviewRepository } from "../../domain/repositories/review.repository";
import { Review } from "../../domain/entities/review";
import { ReviewModel } from "../../domain/schema/review.shema";
import mongoose from "mongoose";

export class ReviewRepository implements IReviewRepository {
  async create(review: Review): Promise<Review> {
    const created = await ReviewModel.create(review);

    return {
      productId: created.productId.toString(),
      userId: created.userId.toString(),
      userName: created.userName,
      rating: created.rating,
      title: created.title,
      content: created.content,
      images: created.images,
      createdAt: created.createdAt,
    };
  }

  async findByProduct(productId: string): Promise<Review[]> {
    const reviews = await ReviewModel.find({ productId })
      .sort({ createdAt: -1 })
      .lean();

    return reviews.map((r) => ({
      id: r._id.toString(),
      productId: r.productId.toString(),
      userId: r.userId.toString(),
      userName: r.userName,
      rating: r.rating,
      title: r.title,
      content: r.content,
      images: r.images,
      createdAt: r.createdAt,
    }));
  }

  async deleteById(reviewId: string, userId: string): Promise<void> {
    const deleted = await ReviewModel.findOneAndDelete({
      _id: reviewId,
      userId,
    });

    if (!deleted) {
      throw new Error("Review not found or unauthorized");
    }
  }

  async getAverageRating(productId: string): Promise<number> {
    const result = await ReviewModel.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$productId",
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    return result.length ? Number(result[0].avgRating.toFixed(1)) : 0;
  }
}
