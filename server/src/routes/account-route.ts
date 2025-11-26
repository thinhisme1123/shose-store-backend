import express from 'express';
import { regsiterController } from '../interfaces/http/controllers/account.controller';

const router = express.Router();

router.post("/register", regsiterController);

export default router;