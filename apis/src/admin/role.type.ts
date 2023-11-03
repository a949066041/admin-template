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

export type IRoleParams = Omit<IRole, 'menus' | 'depts' | keyof IBaseEntity>
