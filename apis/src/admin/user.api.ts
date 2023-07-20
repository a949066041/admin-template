import { ApiInstance } from '../instance'

const baseApi = '/api/users'
class UserApiInstance extends ApiInstance {
  pageApi = baseApi
}

export const UserApi = new UserApiInstance()
