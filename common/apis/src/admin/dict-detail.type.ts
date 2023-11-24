import type { IBaseEntity } from '../base'

export interface IDictDetail {
  dictSort: number
  id: number
  label: string
  value: string
}

export type IDictDetailParams = Omit<IDictDetail, keyof IBaseEntity>
