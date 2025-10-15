import express from 'express';
import { sendOrderEmailController } from '../interfaces/http/controllers/send-email-order.controller';

const router = express.Router();

router.post("/send-order-email", sendOrderEmailController);

export default router;