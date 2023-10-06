import { ApiInstance } from '../instance'
import type { ISaveUserData, IWithPageUserData } from './user.type'

class UserApiInstance extends ApiInstance<IWithPageUserData, 'id', ISaveUserData> {
  baseApi = '/api/users'
}

export const UserApi = new UserApiInstance()
