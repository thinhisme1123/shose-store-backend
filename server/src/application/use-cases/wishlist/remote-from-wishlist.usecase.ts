import { IAccountRepo } from "../../../domain/repositories/account.interface";

export class RemoveWishlistUseCase {
  constructor(private repo: IAccountRepo) {}

  async execute(userId: string, productId: string) {
    return this.repo.removeFromWishlist(userId, productId);
  }
}
