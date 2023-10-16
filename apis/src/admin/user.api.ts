import { ApiInstance } from '../instance'
import type { IUserParams } from './user.type'

class UserApiInstance extends ApiInstance<IUserParams> {
  baseApi = '/api/users'

  public switchEnabled(id: number) {
    return this.$request.setPath(`${this.baseApi}/switch/{id}`).carry(id).put<void>()
  }
}

export const UserApi = new UserApiInstance()
