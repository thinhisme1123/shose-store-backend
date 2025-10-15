import express from "express";
import dotenv from "dotenv";
import { Order } from "./domain/entities/order.js";
import cors from "cors";
import connectDB from "./infrastructure/db/connectdb";
import { mainRoutes } from "./routes/index";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = Number(process.env.PORT || 3001);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
mainRoutes(app)

async function bootstrap() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
}

bootstrap();
