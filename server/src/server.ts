import express from "express";
import dotenv from "dotenv";
import { NodeMailerEmailService } from "./infrastructure/email/node-mailer-emai.service";
import { Order } from "./domain/entities/order";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 3001);
const emailService = new NodeMailerEmailService();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.post("/send-order-email", async (req, res) => {
  try {
    const order: Order = req.body;
    console.log(order);
    
    // Basic validation — expand as needed
    if (!order?.orderDetails?.orderId || !order.firstName || !order.email) {
      return res.status(400).json({ error: "Invalid order payload" });
    }

    // send email to store (await so we know it succeeded; you can switch to background job later)
    await emailService.sendOrderToStore(order);

    // Return success to client
    return res.status(201).json({ success: true, message: "Order received — store notified" });
  } catch (err) {
    console.error("Error sending order email:", err);
    return res.status(500).json({ error: "Failed to notify store" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
