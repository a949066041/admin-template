import { getRequest } from '@yy-web/request'
import type { AuthCode, LoginForm } from './login.type'

export function login(form: LoginForm) {
  return getRequest()!.setPath('/auth/login').post(form)
}

export function code() {
  return getRequest()!.setPath('/auth/code').get<AuthCode>()
}
