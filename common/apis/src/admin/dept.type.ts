import type { IRecordTree } from '../base'

export interface IDeptEntity {
  id: number
  name: string
  enabled: boolean
  deptSort: number
  pid: number | null
}

export interface IDeptTree extends IDeptEntity, IRecordTree {}

export interface IDeptTreeRecord extends IDeptTree {
  parent?: IDeptTreeRecord // refresh
  children: IDeptTreeRecord[]
  isLeaf: boolean
}
export interface IDeptParams {
  name: string
  createTime: [string, string]
  enabled: string
}

export type IDeptTableAndParams = IDeptTreeRecord | IDeptParams
