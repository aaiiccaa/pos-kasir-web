class POST_category_Req_Headers {
  authorization!: string
}
class POST_category_Req_Body {
  name!: string
}

export class POST_category_Req {
  headers!: POST_category_Req_Headers
  body!: POST_category_Req_Body
}
