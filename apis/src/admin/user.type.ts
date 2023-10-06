import type { IBaseEntity } from '../base'
import type { Merge } from '../utils'
import type { IDept } from './dept.type'
import type { IJob } from './job.type'
import type { IRole } from './role.type'

export interface IUser extends IBaseEntity {
  dept: IDept
  deptId: number
  email: string
  enabled: boolean
  gender: string
  id: number
  isAdmin: boolean
  jobs: IJob[]
  nickName: string
  phone: string
  roles: IRole[]
  username: string
}

export type IWithPageUserData = Merge<IUser, IOtherUserData>

export interface IOtherUserData {
  jobs: IJob['id'][]
  roles: IRole['id'][]
  dept: IDept['id']
  enabled: string
}

export interface ISaveUserData {
  jobs: Pick<IJob, 'id'>[]
  roles: Pick<IRole, 'id'>[]
  dept: Pick<IDept, 'id'>
}
