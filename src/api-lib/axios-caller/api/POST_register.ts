class POST_register_Req_Body {
  email!: string
  username!: string
  password!: string
}

export class POST_register_Req {
  body!: POST_register_Req_Body
}
