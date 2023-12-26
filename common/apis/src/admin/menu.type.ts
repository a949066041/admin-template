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
}

interface Meta {
  icon: string
  noCache: boolean
  title: string
}
