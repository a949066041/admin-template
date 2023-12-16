import { ApiInstance } from '../instance'
import type { IDept } from './dept.type'

class DeptApiInstance extends ApiInstance {
  public getDeptTree(params: { pid?: number, enabled?: boolean, name?: string }) {
    return this.$request.setPath('/api/dept').get<{ content: IDept[] }>(params)
  }

  public superior(deptId: number, exclude = false) {
    return this.$request.setPath(`/api/dept/superior?exclude=${exclude}`).post<{ content: IDept[] }>([deptId])
  }
}

export const DeptApi = new DeptApiInstance()
