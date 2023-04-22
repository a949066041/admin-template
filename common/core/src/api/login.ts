import { getRequest } from '@yy-web/request'
import type { AuthCode, Login, LoginForm, MenuList, UserInfo } from './login.type'

export function login(form: LoginForm) {
  return getRequest()!.setPath('/auth/login').post<Login>(form)
}

export function code() {
  return getRequest()!.setPath('/auth/code').get<AuthCode>()
}

export function info() {
  return getRequest()!.setPath('/auth/info').get<UserInfo>()
}

export function buildMenu() {
  return getRequest()!.setPath('/api/menus/build').get<MenuList[]>()
}
