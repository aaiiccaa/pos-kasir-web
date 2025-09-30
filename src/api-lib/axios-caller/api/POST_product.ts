class POST_product_Req_Headers {
  authorization!: string
}
class POST_product_Req_Body {
  name!: string
  price!: number
  stock!: number
  category_id!: number
}

export class POST_product_Req {
  headers!: POST_product_Req_Headers
  body!: POST_product_Req_Body
}
