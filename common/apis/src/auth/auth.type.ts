import type { IUserRecord } from '../admin'

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

export interface Login {
  user: UserInfo
  token: string
}

export interface UserInfo {
  authorities: Authority[]
  dataScopes: string[]
  roles: string[]
  user: IUserRecord
}

interface Authority {
  authority: string
}
