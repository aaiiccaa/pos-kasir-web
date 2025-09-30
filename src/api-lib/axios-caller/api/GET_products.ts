class GET_products_Req_Query {
  limit?: number
  offset?: number
  category_id?: number
}
class GET_products_Req_Headers {
  authorization!: string
}

export class GET_products_Req {
  query!: GET_products_Req_Query
  headers!: GET_products_Req_Headers
}
