import { ApiInstance } from '../instance'
import type { IUserRecord } from './user.type'

class UserApiInstance extends ApiInstance<IUserRecord> {
  baseApi = '/api/users'
}

export const UserApi = new UserApiInstance()
