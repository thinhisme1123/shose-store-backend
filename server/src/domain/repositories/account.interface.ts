import { User } from "../entities/user"

export interface IAccountRepo {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  createUser(data: User): Promise<User>
  updateUser(id: string, data: Partial<User>): Promise<User>;
  changePassword(id: string, currentPw: string, newPw: string): Promise<Object>
  // handle wish list
  getWishlist(userId: string): Promise<any[]>;
  addToWishlist(userId: string, productId: string): Promise<any[]>;
  removeFromWishlist(userId: string, productId: string): Promise<any[]>;
}
    