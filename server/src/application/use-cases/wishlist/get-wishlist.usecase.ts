import { IAccountRepo } from "../../../domain/repositories/account.interface";

export class GetWishlistUseCase {
  constructor(private repo: IAccountRepo) {}

  async execute(userId: string) {
    return this.repo.getWishlist(userId);
  }
}
