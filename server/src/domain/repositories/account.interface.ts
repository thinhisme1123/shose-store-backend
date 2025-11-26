import { User } from "../entities/user"

export interface IAccountRepo {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  createUser(data: User): Promise<User>
}
    