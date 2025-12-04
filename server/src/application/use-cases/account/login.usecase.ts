import bcrypt from "bcrypt"
import { IAccountRepo } from "../../../domain/repositories/account.interface"
import { jwtUtils } from "../../../utils/jwt"
import { User } from "../../../domain/entities/user"

export class LoginUseCase {
  constructor(private repo: IAccountRepo) {}

  async execute(email: string, password: string) {
    const user: User = await this.repo.findByEmail(email)
    if (!user) throw new Error("Email not found")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error("Incorrect password")

    const token = jwtUtils.sign({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    })

    return { token, user }
  }
}
