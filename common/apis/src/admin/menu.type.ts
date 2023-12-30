import type { IBaseEntity, IRecordTree } from '../'

export interface MenuList {
  cache: boolean
  createTime: string
  hasChildren: boolean
  hidden: boolean
  iFrame: boolean
  icon: string
  id: number
  label: string
  leaf: boolean
  menuSort: number
  path: string
  subCount: number
  title: string
  type: number
}

export interface IMenuLazy {
  cache: boolean
  createTime: string
  hasChildren: boolean
  hidden: boolean
  iFrame: boolean
  icon: string
  id: number
  label: string
  leaf: boolean
  menuSort: number
  path: string
  subCount: number
  title: string
  type: number
  meta: Meta
}

interface Meta {
  icon: string
  noCache: boolean
  title: string
}

// private Set<Role> roles;
export interface IMenuEntity {
  id: number
  title: string
  componentName: string
  menuSort: number
  component: string
  path: string
  type: number // 目录、菜单、按钮
  permission: string
  icon: string
  cache: boolean
  hidden: boolean
  pid: number
  iFrame: boolean
}

export interface IMenuTree extends IMenuEntity, IBaseEntity, IRecordTree {}

export interface IMenuTreeRecord extends IMenuTree {
  parent?: IMenuTreeRecord // refresh
  children: IMenuTreeRecord[]
  isLeaf: boolean
}

export interface IMenuTableParams {
  blurry: string
  createTime: [string, string]
}
