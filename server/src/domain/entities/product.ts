export interface Product {
  title: string
  slug: string
  price: number
  compareAtPrice?: number | null
  images: string[]
  colors: string[]
  sizes: string[]
  description: string
  tags: string[]
  inventory: number
  category: string
  gender: "men" | "women" | "unisex"
}
