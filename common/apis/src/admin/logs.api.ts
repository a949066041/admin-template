import { ApiInstance } from '../instance'
import type { ILogsEntity } from './logs.type'

class LogApiInstance extends ApiInstance<ILogsEntity> {
  baseApi = '/api/logs'

  public getErrorLog(params: Record<string, any>) {
    return this.$request.setPath(`${this.baseApi}/error`).get<{ totalElements: number, content: ILogsEntity[] }>(params)
  }
}

export const LogsApi = new LogApiInstance()
