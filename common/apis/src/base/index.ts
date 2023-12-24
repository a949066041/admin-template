export interface IBaseEntity {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
}

export interface IRecordTree {
  hasChildren: boolean
  label: string
  leaf: boolean
  subCount: number
}

export type IEntity<T> = T & IBaseEntity
