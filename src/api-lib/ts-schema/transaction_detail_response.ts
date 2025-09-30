import { transaction_item } from '../ts-model/table/transaction_item'

export class transaction_detail_response {
  id!: number
  user_id!: number
  total!: number
  transaction_item!: transaction_item[]
}