import { ApiInstance } from '../instance'
import type { IDept } from './dept.type'

class DeptApiInstance extends ApiInstance {
  public getDeptTree(pid?: number) {
    return this.$request.setPath('/api/dept').get<{ content: IDept[] }>({ pid }, true)
  }

  public superior(deptId: number, exclude = false) {
    return this.$request.setPath(`/api/dept/superior?exclude=${exclude}`).post<{ content: IDept[] }>([deptId])
  }
}

export const DeptApi = new DeptApiInstance()
