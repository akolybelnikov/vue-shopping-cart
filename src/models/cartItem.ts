import { Product } from './product'

export interface CartItem {
  item: Product
  amount: number
  total: number
}
