import type { IBaseEntity, IRecordTree } from '../base'

export interface IDeptEntity {
  id: number
  name: string
  enabled: boolean
  deptSort: number
  subCount: number
  pid?: number
}

export interface IDeptTree extends IDeptEntity, IBaseEntity, IRecordTree {}

export interface IDeptTreeRecord extends IDeptTree {
  parent?: IDeptTreeRecord // refresh
  children: IDeptTreeRecord[]
  isLeaf: boolean
}
export interface IDeptTableParams {
  name: string
  createTime: [string, string]
  enabled: string
}
