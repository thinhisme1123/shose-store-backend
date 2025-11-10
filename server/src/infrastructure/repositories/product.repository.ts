import { ProductModel } from "../../domain/schema/product.schema";
import { IProductRepo } from "../../domain/repositories/IProductRepo";
import { Product } from "../../domain/entities/product";

export class ProductRepo implements IProductRepo {
  async findBySlug(slug: string): Promise<Product | null> {
    return ProductModel.findOne({ slug }).lean();
  }

  async findByCategory(category: string): Promise<Product[]> {
    return ProductModel.find({ category }).lean();
  }

  async findByGender(gender: string): Promise<Product[]> {
    return ProductModel.find({
      $or: [{ gender }, { gender: "unisex" }],
    }).lean();
  }

  async searchByKeyword(keyWord: string): Promise<Product[]> {
    return ProductModel.find({
      $or: [
        { title: { $regex: keyWord, $options: "i" } },
        { description: { $regex: keyWord, $options: "i" } },
      ],
    }).lean();
  }
}
