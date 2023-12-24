import type { IBaseEntity } from '../base'

export interface IJobEntity {
  id: number
  name: string
  enabled: boolean
  jobSort: number
}

export interface IJobRecord extends IJobEntity, IBaseEntity {
}

export interface IJobPageParams {
  blurry: string
}
