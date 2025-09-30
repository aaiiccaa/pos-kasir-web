class GET_transactions_Req_Query {
  limit?: number
  offset?: number
}
class GET_transactions_Req_Headers {
  authorization!: string
}

export class GET_transactions_Req {
  query!: GET_transactions_Req_Query
  headers!: GET_transactions_Req_Headers
}
