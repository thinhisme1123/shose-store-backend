import { Request, Response } from "express"
import { NodeMailerEmailService } from "../../../infrastructure/email/node-mailer-emai.service"
import { Order } from "../../../domain/entities/order"

// You can instantiate your email service here or inject it from DI later
const emailService = new NodeMailerEmailService()

export async function sendOrderEmailController(req: Request, res: Response) {
  try {
    const order: Order = req.body
    console.log("📦 Incoming order:", order)

    // Basic validation
    if (!order?.orderDetails?.orderId || !order.firstName || !order.email) {
      return res.status(400).json({ error: "Invalid order payload" })
    }

    // Send email to store
    await emailService.sendOrderToStore(order)

    return res
      .status(201)
      .json({ success: true, message: "Order received — store notified" })
  } catch (err) {
    console.error("❌ Error sending order email:", err)
    return res.status(500).json({ error: "Failed to notify store" })
  }
}
