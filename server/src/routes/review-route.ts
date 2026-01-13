import express from 'express';
import { createReviewController, fingByProductIdReviewController } from '../interfaces/http/controllers/review.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post("/create", authMiddleware, createReviewController);
router.get("/find-by-productid/:id", fingByProductIdReviewController);

export default router;