import type { IBaseEntity } from '../'
import type { IDeptEntity } from './dept.type'
import type { MenuList } from './menu.type'

export interface IRoleEntity {
  dataScope: string
  description: string
  id: number
  level: number
  name: string
}

export interface IRoleRecord extends IRoleEntity, IBaseEntity {
  depts: IDeptEntity[]
  menus: MenuList[]
}

export interface IRolePageParams {
  blurry: string
  createTime: [string, string]
}
