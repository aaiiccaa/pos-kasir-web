class PUT_user__id_Req_Paths {
  id!: number
}
class PUT_user__id_Req_Headers {
  authorization!: string
}
class PUT_user__id_Req_Body {
  username?: string
  email?: string
  password?: string
}

export class PUT_user__id_Req {
  paths!: PUT_user__id_Req_Paths
  headers!: PUT_user__id_Req_Headers
  body!: PUT_user__id_Req_Body
}
