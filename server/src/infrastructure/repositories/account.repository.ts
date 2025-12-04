import { IAccountRepo } from "../../domain/repositories/account.interface";
import { ProductModel } from "../../domain/schema/product.schema";
import { UserModel } from "../../domain/schema/user.schema";
import { User } from "../../domain/entities/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export class UserRepository implements IAccountRepo {
  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }) as any;
  }

  async findById(id: string): Promise<User | null> {
    return UserModel.findById(id) as any;
  }

  async createUser(data: User): Promise<User> {
    return (await UserModel.create(data)) as any;
  }

  async updateUser(id, data) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async changePassword(id: string, currentPw: string, newPw: string) {
    const user = await UserModel.findById(id).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(currentPw, user.password);
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPw, salt);

    return UserModel.findByIdAndUpdate(
      id,
      { password: newHashedPassword },
      { new: true }
    );
  }

  async getWishlist(userId: string) {
    const user = await UserModel.findById(userId).populate("wishlist");

    return user?.wishlist || [];
  }

  async addToWishlist(userId: string, productId: string) {
    const user = await UserModel.findById(userId);

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    return this.getWishlist(userId);
  }

  async removeFromWishlist(userId: string, productId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    // Filter out invalid/null values FIRST
    user.wishlist = user.wishlist.filter((id) => id != null);

    if (!mongoose.isValidObjectId(productId)) {
      throw new Error("Invalid product ID");
    }

    const prodObjectId = new mongoose.Types.ObjectId(productId);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== prodObjectId.toString()
    );

    await user.save();
    return this.getWishlist(userId);
  }
}
