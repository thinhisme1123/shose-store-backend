import { Request, Response } from "express"
import { NodeMailerEmailService } from "../../../infrastructure/email/node-mailer-emai.service"
import { Order } from "../../../domain/entities/order"
import { ProductModel } from "../../../domain/schema/product.schema"
import { OrderModel } from "../../../domain/schema/order.schema"

const emailService = new NodeMailerEmailService()

export async function createOrderController(req: Request, res: Response) {
  try {
    const order: Order = req.body
    console.log("📦 Creating order:", order)

    // 1️⃣ Basic validation
    if (
      !order?.orderDetails?.items?.length ||
      !order.firstName ||
      !order.email
    ) {
      return res.status(400).json({ error: "Invalid order payload" })
    }

    const items = order.orderDetails.items

    // 2️⃣ Validate stock
    for (const item of items) {
      const product = await ProductModel.findById(item.productId)

      if (!product) {
        return res.status(404).json({
          error: `Product not found: ${item.productId}`,
        })
      }

      if (product.inventory < item.quantity) {
        return res.status(400).json({
          error: `Not enough stock for ${product.title}`,
        })
      }
    }

    // 3️⃣ Deduct inventory
    for (const item of items) {
      await ProductModel.findByIdAndUpdate(
        item.productId,
        {
          $inc: { inventory: -item.quantity },
        },
        { new: true }
      )
    }

    // 4️⃣ Save order to database (if you have schema)
    const newOrder = await OrderModel.create(order)

    // 5️⃣ Send email
    await emailService.sendOrderToStore(newOrder)

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newOrder._id,
    })
  } catch (err) {
    console.error("❌ Error creating order:", err)
    return res.status(500).json({
      error: "Failed to create order",
    })
  }
}