import { User } from './../../../domain/entities/user';
import { Request, Response } from "express";
import { UserRepository } from "../../../infrastructure/repositories/account.repository";
import { RegisterUser } from "../../../application/use-cases/account/register.usecase";
import { LoginUseCase } from "../../../application/use-cases/account/login.usecase";
import { GetMeUseCase } from "../../../application/use-cases/account/get-me.usecase";
import { UpdateUserUseCase } from "../../../application/use-cases/account/update-user.usecase";
import { ChangePasswordUseCase } from "../../../application/use-cases/account/change-password.usecases";
import { GetWishlistUseCase } from "../../../application/use-cases/wishlist/get-wishlist.usecase";
import { AddToWishlistUseCase } from "../../../application/use-cases/wishlist/add-wishlist.usecase";
import { RemoveWishlistUseCase } from "../../../application/use-cases/wishlist/remote-from-wishlist.usecase";
import { log } from "node:console";

const repo = new UserRepository();

const registerUser = new RegisterUser(repo);
const loginUseCase = new LoginUseCase(repo);
const getMe = new GetMeUseCase();
const updateUser = new UpdateUserUseCase(repo);
const changePassword = new ChangePasswordUseCase(repo);
const getWishlist = new GetWishlistUseCase(repo);
const addWishlist = new AddToWishlistUseCase(repo);
const removeWishlist = new RemoveWishlistUseCase(repo);

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const result = await loginUseCase.execute(email, password);

    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function regsiterController(req: Request, res: Response) {
  try {
    const user = await registerUser.execute(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
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

export async function updateUserController(req, res) {
  try {
    const userId = req.user.id;
    const updated = await updateUser.execute(userId, req.body);
    res.json({ user: updated });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
}

export async function changePasswordController(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const result = await changePassword.execute(
      userId,
      currentPassword,
      newPassword
    );

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
}

// handle wishlist
export async function getWishlistController(req, res) {
  try {
    const items = await getWishlist.execute(req.user.id);
    res.json({ wishlist: items });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addWishlistController(req, res) {
  try {
    const { productId } = req.body;
    const items = await addWishlist.execute(req.user.id, productId);
    res.json({ wishlist: items });
  } catch (e) {
    console.error("🔥 WISHLIST ERROR:", e);
    res.status(500).json({ message: e.message });
  }
}

export async function removeWishlistController(req, res) {
  try {
    const { productId } = req.params;

    const items = await removeWishlist.execute(req.user.id, productId);
    res.json({ wishlist: items });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
