import express from 'express';
import { getMeController, loginController, regsiterController } from '../interfaces/http/controllers/account.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post("/register", regsiterController);
router.post("/login", loginController);
router.get("/me", authMiddleware, getMeController);


export default router;