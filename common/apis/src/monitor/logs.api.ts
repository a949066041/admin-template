import type { ILogEntity } from './logs.type'
import { ApiInstance } from '../instance'

const baseApi = '/api/logs'

class LogsApiInstance extends ApiInstance {
  baseApi = baseApi

  public user(params: Record<string, any>) {
    return this.$request.setPath(`${this.baseApi}/user`).get<{ totalElements: number, content: ILogEntity[] }>(params)
  }
}

export const LogsApi = new LogsApiInstance()
