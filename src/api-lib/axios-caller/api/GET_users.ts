class GET_users_Req_Query {
  limit?: number
  offset?: number
}
class GET_users_Req_Headers {
  authorization!: string
}

export class GET_users_Req {
  query!: GET_users_Req_Query
  headers!: GET_users_Req_Headers
}
