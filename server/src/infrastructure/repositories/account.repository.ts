import { IAccountRepo } from "../../domain/repositories/account.interface"
import { UserModel } from "../../domain/schema/user.schema"
import { User } from "../../domain/entities/user"

export class UserRepository implements IAccountRepo {
  
  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }) as any
  }

  async findById(id: string): Promise<User | null> {
    return UserModel.findById(id) as any
  }

  async createUser(data: User): Promise<User> {
    return await UserModel.create(data) as any
  }
}
