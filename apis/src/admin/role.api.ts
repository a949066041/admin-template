import { ApiInstance } from '../instance'
import type { IRole } from './role.type'

const baseApi = '/api/roles'

class RoleApiInstance extends ApiInstance<IRole> {
  baseApi = baseApi
}

export const RoleApi = new RoleApiInstance()
