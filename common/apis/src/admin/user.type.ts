import type { IBaseEntity } from '../base'
import type { Merge } from '../utils'
import type { IDeptEntity } from './dept.type'
import type { IJobEntity } from './job.type'
import type { IRole } from './role.type'

export interface IUser extends IBaseEntity {
  dept: IDeptEntity
  deptId: number
  email: string
  enabled: boolean
  gender: string
  id: number
  isAdmin: boolean
  jobs: IJobEntity[]
  nickName: string
  phone: string
  roles: IRole[]
  username: string
}

export type IUserParams = Merge<Omit<IUser, 'isAdmin' | keyof IBaseEntity>, ISaveUserData>

export interface IOtherUserData {
  jobs: IJobEntity['id'][]
  roles: IRole['id'][]
  dept: IDeptEntity['id']
  enabled: string
}

export interface IUserSearchParams {
  blurry: string
  createTime: [string, string]
  enabled: string
}

export interface ISaveUserData {
  jobs: number[]
  roles: number[]
}
