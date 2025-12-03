import { IAccountRepo } from "../../../domain/repositories/account.interface";

export class AddToWishlistUseCase {
  constructor(private repo: IAccountRepo) {}

  async execute(userId: string, productId: string) {
    return this.repo.addToWishlist(userId, productId);
  }
}
