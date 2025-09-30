import { user } from '../../ts-model/table/user'

export class token {
  id!: number
  otm_user_id!: user;
  user_id!: number
  token!: string
  expired_at!: Date
}