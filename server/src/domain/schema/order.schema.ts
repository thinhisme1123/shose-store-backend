import mongoose, { Model, Schema, model } from "mongoose"
import { Order } from "../entities/order"

// ---- Order Item Subdocument ----
const orderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false } // prevent extra _id for each item
)

// ---- Order Details Subdocument ----
const orderDetailsSchema = new Schema(
  {
    orderId: { type: String, required: true },
    orderDate: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
)

// ---- Main Order Schema ----
const orderSchema = new Schema<Order>(
  {
    orderDetails: { type: orderDetailsSchema, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    address: { type: String, required: true },
    apartment: { type: String, default: "" },
    city: { type: String, required: true },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },

    paymentMethod: { type: String, required: true },

  },
  { timestamps: true }
)

export const OrderModel: Model<Order> =
  (mongoose.models.Orders as Model<Order>) ||
  model<Order>("Orders", orderSchema)