import type { IBaseEntity } from '../base'
import type { IDict } from './dict.type'

export interface IDictDetail {
  dictSort: number
  id: number
  dict?: IDict
  label: string
  value: string
}

export type IDictDetailParams = Omit<IDictDetail, keyof IBaseEntity>
