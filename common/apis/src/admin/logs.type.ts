import type { IBaseEntity } from '../base'

export interface ILogsEntity {
  id: number
  username: string
  requestIp: string
  address: string
  description: string
  browser: string
  time: number
  createTime: string
}

export interface ILogsRecord extends ILogsEntity, IBaseEntity {
}

export interface ILogsTableParams {
  blurry: string
}
