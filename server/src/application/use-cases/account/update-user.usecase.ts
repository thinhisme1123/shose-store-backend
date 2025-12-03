import { IAccountRepo } from "../../../domain/repositories/account.interface";

export class UpdateUserUseCase {
  constructor(private repo: IAccountRepo) {}

  async execute(id: string, data: any) {
    return this.repo.updateUser(id, data);
  }
}