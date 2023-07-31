import { ApiInstance } from '../instance'

const baseApi = '/api/roles'

class RoleApiInstance extends ApiInstance {
  baseApi = baseApi
}

export const RoleApi = new RoleApiInstance()
