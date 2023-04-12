export interface LoginForm {
  username: string
  password: string
  code: string
  uuid: string
}

export interface AuthCode {
  img: string
  uuid: LoginForm['uuid']
}
