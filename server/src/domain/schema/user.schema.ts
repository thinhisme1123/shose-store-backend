import mongoose, { Model, Schema, model } from "mongoose";
import { User } from "../entities/user";

const userSchema = new Schema<User>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscribeNewsletter: { type: Boolean, default: false },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const UserModel: Model<User> =
  (mongoose.models.Users as Model<User>) || model<User>("Users", userSchema);
