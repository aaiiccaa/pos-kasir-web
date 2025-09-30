import { user } from '../../ts-model/table/user'

export class transaction {
  id!: number
  otm_user_id!: user;
  user_id!: number
  total!: number
  is_active!: boolean
  created_at!: Date
}