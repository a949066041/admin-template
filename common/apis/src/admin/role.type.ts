import type { IBaseEntity } from '../base'
import type { IDept } from './dept.type'
import type { MenuList } from './menu.type'

export interface IRole extends IBaseEntity {
  dataScope: string
  depts: IDept[]
  description: string
  id: number
  level: number
  menus: MenuList[]
  name: string
}

export interface IRoleSearchParams {
  blurry: string
  createTime: [string, string]
}

export type IRoleParams = Omit<IRole, 'menus' | 'depts' | keyof IBaseEntity>
