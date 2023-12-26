import type { IBaseEntity } from '../base'
import type { IDeptEntity } from './dept.type'
import type { IJobEntity } from './job.type'
import type { IRoleEntity } from './role.type'

export interface IUserEntity {
  id: number
  username: string
  nickName: string
  email: string
  phone: string
  gender: string
  avatarName: string
  avatarPath: string
  password: string
  enabled: boolean
  isAdmin: boolean
  pwdResetTime: string
}

export interface IUserRecord extends IUserEntity, IBaseEntity {
  roles: IRoleEntity[] | number[]
  jobs: IJobEntity[] | number[]
  dept: IDeptEntity
  deptId: number
}

export interface IUserTableParams {
  blurry: string
  createTime: [string, string]
  enabled: string
  deptId: number
}
