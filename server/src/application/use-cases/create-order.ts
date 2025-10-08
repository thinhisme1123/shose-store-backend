// application/use-cases/CreateOrder.ts
import { Order } from "../../domain/entities/order"
import { InMemoryOrderRepository } from "../../infrastructure/repositories/order.repository"
import { EmailService } from "../services/email-service"

export class CreateOrder {
  constructor(
    private orderRepo: InMemoryOrderRepository,
    private emailService: EmailService
  ) {}

  async execute(order: Order) {
    // Save order
    await this.orderRepo.save(order)

    // Send emails
    await this.emailService.sendOrderNotification(order)
    await this.emailService.sendOrderConfirmation(order)

    return order
  }
}
