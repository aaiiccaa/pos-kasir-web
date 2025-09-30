class GET_category_Req_Query {
  limit?: number
  offset?: number
}
class GET_category_Req_Headers {
  authorization!: string
}

export class GET_category_Req {
  query!: GET_category_Req_Query
  headers!: GET_category_Req_Headers
}
