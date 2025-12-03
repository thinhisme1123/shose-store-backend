import { IAccountRepo } from "../../../domain/repositories/account.interface";

export class ChangePasswordUseCase {
  constructor(private repo: IAccountRepo) {}

  async execute(id, currentPw, newPw) {
    return this.repo.changePassword(id, currentPw, newPw)
  }
}
