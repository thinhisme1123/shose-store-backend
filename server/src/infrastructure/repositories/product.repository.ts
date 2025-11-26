import { ProductModel } from "../../domain/schema/product.schema";
import { IProductRepo } from "../../domain/repositories/product.interface";
import { Product } from "../../domain/entities/product";

export class ProductRepo implements IProductRepo {
  async findBySlug(slug: string): Promise<Product | null> {
    return ProductModel.findOne({ slug }).lean();
  }

  async findById(id: string) {
    return await ProductModel.findById(id);
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

  async findAll(): Promise<Product[]> {
    return ProductModel.find({}).lean();
  }

  
  async updateProductById(id: string, newData: Product): Promise<Product> {
    return await ProductModel.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true
    });
  }

  async createProduct(data: Product) {
    return await ProductModel.create(data);
  }

  async deleteProduct(id: string) {
    return await ProductModel.findByIdAndDelete(id);
  }

  
}
