class PUT_product__id_Req_Paths {
  id!: number
}
class PUT_product__id_Req_Headers {
  authorization!: string
}
class PUT_product__id_Req_Body {
  name?: string
  stock?: number
  price?: number
  category_id?: number
}

export class PUT_product__id_Req {
  paths!: PUT_product__id_Req_Paths
  headers!: PUT_product__id_Req_Headers
  body!: PUT_product__id_Req_Body
}
