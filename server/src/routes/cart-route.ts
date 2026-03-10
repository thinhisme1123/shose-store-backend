import express from 'express';
import { createOrderController } from '../interfaces/http/controllers/create-order-controller';

const router = express.Router();

router.post("/orders", createOrderController);

export default router;