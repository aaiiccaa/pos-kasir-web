import { category } from '../../ts-model/table/category'

export class product {
  id!: number
  name!: string
  price!: number
  stock!: number
  otm_category_id!: category;
  category_id!: number
  is_active!: boolean
  created_at!: Date
}