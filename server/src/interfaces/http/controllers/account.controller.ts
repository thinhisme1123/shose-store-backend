import { Request, Response } from "express"
import { UserRepository } from "../../../infrastructure/repositories/account.repository"
import { RegisterUser } from "../../../application/use-cases/register"
import { LoginUseCase } from "../../../application/use-cases/login"
import { GetMeUseCase } from "../../../application/use-cases/get-me"

const repo = new UserRepository()

const registerUser = new RegisterUser(repo)
const loginUseCase = new LoginUseCase(repo)
const getMe = new GetMeUseCase();

export async function loginController(req, res) {
  try {
    const { email, password } = req.body

    const result = await loginUseCase.execute(email, password)

    return res.json(result)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export async function regsiterController(req: Request, res: Response) {
  try {
    const user = await registerUser.execute(req.body)
    res.status(201).json(user)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export async function getMeController(req, res) {
  try {
    const result = await getMe.execute(req.user);
    return res.json({ user: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

