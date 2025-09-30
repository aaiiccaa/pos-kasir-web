import { transaction } from '../../ts-model/table/transaction'
import { product } from '../../ts-model/table/product'

export class transaction_item {
  id!: number
  otm_transaction_id!: transaction;
  transaction_id!: number
  otm_product_id!: product;
  product_id!: number
  qty!: number
  price!: number
  total!: number
  is_active!: boolean
  created_at!: Date
}