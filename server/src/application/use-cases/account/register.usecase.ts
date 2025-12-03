import { IAccountRepo } from '../../../domain/repositories/account.interface';
import bcrypt from "bcrypt"

export class RegisterUser {
  constructor(private repo: IAccountRepo) {}

  async execute(data: {
    firstName: string
    lastName: string
    email: string
    password: string
    subscribeNewsletter: boolean
  }) {
    const existing = await this.repo.findByEmail(data.email)
    if (existing) {
      throw new Error("Email already registered")
    }

    const hashed = await bcrypt.hash(data.password, 10)

    const user = {
      id: "",
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: hashed,
      subscribeNewsletter: data.subscribeNewsletter,
      wishlist: [],
      createdAt: new Date(),
    }

    return this.repo.createUser(user)
  }
}
