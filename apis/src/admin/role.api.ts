import { ApiInstance } from '../instance'
import type { IRole } from './role.type'

const baseApi = '/api/roles'

class RoleApiInstance extends ApiInstance<IRole> {
  baseApi = baseApi

  public all() {
    return this.$request.setPath(`${this.baseApi}/all`).get<IRole[]>(true)
  }
}

export const RoleApi = new RoleApiInstance()
