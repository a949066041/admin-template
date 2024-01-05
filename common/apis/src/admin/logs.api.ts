import { ApiInstance } from '../instance'
import type { ILogsEntity } from './logs.type'

const baseApi = '/api/logs'
class LogApiInstance extends ApiInstance<ILogsEntity> {
  baseApi = baseApi
  constructor() {
    super()
    this.getErrorLog = this.getErrorLog.bind(this)
  }

  public getErrorLog(params: Record<string, any>) {
    return this.$request.setPath(`${baseApi}/error`).get<{ totalElements: number, content: ILogsEntity[] }>(params)
  }

  public getErrorLogDetail(id: string | number) {
    return this.$request.setPath(`${baseApi}/error/${id}`).get<{ exception: string }>()
  }
}

export const LogsApi = new LogApiInstance()
