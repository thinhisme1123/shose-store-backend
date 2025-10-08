// domain/entities/Order.ts
export interface OrderItem {
  productId: string
  title: string
  price: number
  quantity: number
  size: string
  color: string
}

export interface Order {
  orderDetails: {
    orderId: string
    orderDate: string
    items: OrderItem[]
    subtotal: number
    shippingCost: number
    tax: number
    total: number
  }, 
  id: string,
  firstName: string
  lastName: string
  email: string
  address: string
  apartment?: string
  city: string
  state?: string
  zip?: string
  paymentMethod: string
}
