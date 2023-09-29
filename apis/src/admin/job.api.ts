import { ApiInstance } from '../instance'
import type { IDept } from './dept.type'

class DeptApiInstance extends ApiInstance {
  public getDeptTree(pid?: number) {
    return this.$request.setPath('/api/dept').get<{ content: IDept[] }>({ pid }, true)
  }
}

export const DeptApi = new DeptApiInstance()
