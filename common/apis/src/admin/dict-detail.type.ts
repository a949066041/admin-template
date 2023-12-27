import type { IBaseEntity } from '../base'
import type { IDictEntity } from './dict.type'

export interface IDictDetailEntity {
  dictSort: number
  id: number
  dict?: IDictEntity
  label: string
  value: string
}

export interface IDictDetailRecord extends IDictEntity, IBaseEntity {
}

export interface IDictDetailTableParams {
  blurry: string
  dictName: string
}
