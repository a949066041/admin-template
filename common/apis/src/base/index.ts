export interface IBaseEntity {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
}

export type IEntity<T> = T & IBaseEntity
