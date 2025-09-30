import { transaction_payload } from '../../ts-schema/transaction_payload'
class POST_transaction_Req_Headers {
  authorization!: string
}
class POST_transaction_Req_Body {
  data!: transaction_payload[]
}

export class POST_transaction_Req {
  headers!: POST_transaction_Req_Headers
  body!: POST_transaction_Req_Body
}
