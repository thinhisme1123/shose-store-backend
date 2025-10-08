import { Order } from "../../domain/entities/order";

export interface IOrderRepository {
  save(order: Order): Promise<void>
  findById(id: string): Promise<Order | null>
}
