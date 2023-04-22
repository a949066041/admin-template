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
  dataScopes: any[]
  roles: string[]
  user: User
}

export interface User {
  avatarName: string
  avatarPath: string
  createTime: string
  dept: Dept
  email: string
  enabled: boolean
  gender: string
  id: number
  isAdmin: boolean
  jobs: Dept[]
  nickName: string
  password: string
  phone: string
  pwdResetTime: string
  roles: Role[]
  updateBy: string
  updateTime: string
  username: string
}

interface Role {
  dataScope: string
  id: number
  level: number
  name: string
}

interface Dept {
  id: number
  name: string
}

interface Authority {
  authority: string
}

export interface MenuList {
  alwaysShow: boolean
  children: Child[]
  component: string
  hidden: boolean
  meta: Meta
  name: string
  path: string
  redirect: string
}

interface Child {
  alwaysShow?: boolean
  children?: Child[]
  component: string
  hidden: boolean
  meta: Meta
  name: string
  path: string
  redirect?: string
}

interface Meta {
  icon: string
  noCache: boolean
  title: string
}
