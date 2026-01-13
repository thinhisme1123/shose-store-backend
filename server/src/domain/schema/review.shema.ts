// src/infrastructure/db/models/Review.model.ts
import mongoose, { Schema } from "mongoose"

const ReviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

// Một user chỉ được review 1 lần / product
ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true })

export const ReviewModel = mongoose.model("Review", ReviewSchema)
