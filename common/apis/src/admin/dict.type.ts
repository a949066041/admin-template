import type { IBaseEntity } from '../base'

export interface IDict {
  id: number
  name: string
  description: string
}

export type IDictParams = Omit<IDict, keyof IBaseEntity>
