import type { IBaseEntity } from '../base'

export interface IDept extends IBaseEntity {
  deptSort: number
  enabled: boolean
  hasChildren: boolean
  id: number
  label: string
  leaf: boolean
  name: string
  pid: number
  subCount: number
}
