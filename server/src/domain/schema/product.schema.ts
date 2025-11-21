import mongoose, { Model, Schema, model } from "mongoose"
import { Product } from "../entities/product"

const productSchema = new Schema<Product>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: null },
    images: [String],
    colors: [String],
    sizes: [String],
    description: String,
    tags: [String],
    inventory: Number,
    category: String,
    gender: { type: String, enum: ["men", "women", "unisex"], default: "unisex" },
  },
  { timestamps: true }
)

export const ProductModel: Model<Product> = (mongoose.models.Product as Model<Product>) || model<Product>("Products", productSchema)
