import { ApiInstance } from '../instance'
import type { IUser } from './user.type'

class UserApiInstance extends ApiInstance<IUser> {
  baseApi = '/api/users'
}

export const UserApi = new UserApiInstance()
