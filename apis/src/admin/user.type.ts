import type { IBaseEntity } from '../base'
import type { IDept } from './dept.type'

export interface IRole extends IBaseEntity {
  dataScope: string
  depts: IDept[]
  description: string
  id: number
  level: number
  menus: any[]
  name: string
}
