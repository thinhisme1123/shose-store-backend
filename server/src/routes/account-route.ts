import express from "express";
import {
  addWishlistController,
  changePasswordController,
  getMeController,
  getWishlistController,
  loginController,
  regsiterController,
  removeWishlistController,
  updateUserController,
} from "../interfaces/http/controllers/account.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", regsiterController);
router.post("/login", loginController);
router.get("/me", authMiddleware, getMeController);
router.put("/update", authMiddleware, updateUserController);
router.put("/change-password", authMiddleware, changePasswordController);
//handle wishlist
router.get("/wishlist", authMiddleware, getWishlistController);
router.post("/wishlist", authMiddleware, addWishlistController);
router.delete("/wishlist/:productId", authMiddleware, removeWishlistController);

export default router;
