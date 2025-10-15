import { Order } from "../../domain/entities/order.js";

export interface EmailService {
  sendOrderNotification(order: Order): Promise<void>
  sendOrderConfirmation(order: Order): Promise<void>
}
