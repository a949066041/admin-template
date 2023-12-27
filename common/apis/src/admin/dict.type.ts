import type { IBaseEntity } from '../base'

export interface IDictEntity {
  id: number
  name: string
  description: string
}

export interface IDictRecord extends IDictEntity, IBaseEntity {
}

export interface IDictTableParams {
  blurry: string
}
