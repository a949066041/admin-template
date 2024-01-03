import { ApiInstance } from '../instance'
import type { IMonitorInfo } from './monitor.type'

const baseApi = '/api/monitor'

class MonitorApiInstance extends ApiInstance {
  baseApi = baseApi

  public getInfo() {
    return this.$request.setPath(this.baseApi).get<IMonitorInfo>()
  }
}

export const MonitorApi = new MonitorApiInstance()
