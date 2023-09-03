import { ApiInstance } from '../instance'

class UserApiInstance extends ApiInstance {
  baseApi = '/api/users'
}

export const UserApi = new UserApiInstance()
