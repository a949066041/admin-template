import { ApiInstance } from '../instance'
import type { IRole } from './role.type'

const baseApi = '/api/roles'

class RoleApiInstance extends ApiInstance {
  baseApi = baseApi
  public saveRole(data: IRole) {
    return this.$request.setPath(this.baseApi).post<void>(data)
  }

  public putRole(data: IRole) {
    return this.$request.setPath(this.baseApi).put<void>(data)
  }
}

export const RoleApi = new RoleApiInstance()
