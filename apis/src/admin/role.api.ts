import { ApiInstance } from '../instance'

const baseApi = '/api/roles'

class RoleApiInstance extends ApiInstance {
  pageApi = baseApi
}

export const RoleApi = new RoleApiInstance()
