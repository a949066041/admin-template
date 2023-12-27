import { ApiInstance } from '../instance'
import type { IDeptEntity, IDeptTree, IDeptTreeRecord } from './dept.type'

const baseApi = '/api/dept'

class DeptApiInstance extends ApiInstance<IDeptEntity> {
  baseApi = baseApi
  constructor() {
    super()
    this.pageTree = this.pageTree.bind(this)
  }

  public getDeptTree(params: { pid?: number, enabled?: boolean, name?: string }) {
    return this.$request.setPath(baseApi).get<{ content: IDeptTreeRecord[] }>(params)
  }

  public superior(deptId: number, exclude = false) {
    return this.$request.setPath(`${baseApi}/superior?exclude=${exclude}`).post<{ content: IDeptTreeRecord[] }>([deptId])
  }

  public pageTree(params: Record<string, any>): Promise<IDeptTreeRecord[]> {
    return this.$request.setPath(this.baseApi)
      .get<{ totalElements: number, content: IDeptTree[] }>(params)
      .then((res) => {
        return res.content.map(item => ({ ...item, isLeaf: item.leaf, children: [] }))
      })
  }
}

export const DeptApi = new DeptApiInstance()
