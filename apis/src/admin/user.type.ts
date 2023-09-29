import type { IBaseEntity } from '../base'
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
