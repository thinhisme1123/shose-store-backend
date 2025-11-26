import { Request, Response } from "express"
import { UserRepository } from "../../../infrastructure/repositories/account.repository"
import { RegisterUser } from "../../../application/use-cases/register"

const repo = new UserRepository()

const registerUser = new RegisterUser(repo)

export async function regsiterController(req: Request, res: Response) {
  try {
    const user = await registerUser.execute(req.body)
    res.status(201).json(user)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}