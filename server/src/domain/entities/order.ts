// domain/entities/Order.ts
export type OrderStatus =
  | "CREATED"     // vừa tạo, chưa thanh toán
  | "PAID"        // đã thanh toán
  | "CANCELLED"   // user / system hủy
  | "SHIPPED"     // đã giao cho vận chuyển
  | "DELIVERED"   // giao thành công


export interface CartItem {
  productId: string
  title: string
  price: number
  quantity: number
  size: string
  color: string

  reservedUntil: string
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus

  orderDetails: {
    orderId: string
    orderDate: string
    items: CartItem[]
    subtotal: number
    shippingCost: number
    tax: number
    total: number
  }

  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  apartment?: string
  city: string
  state?: string
  zip?: string
  paymentMethod: string
}

