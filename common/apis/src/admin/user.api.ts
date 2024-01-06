import { ApiInstance } from '../instance'
import type { IUserRecord } from './user.type'

class UserApiInstance extends ApiInstance<IUserRecord> {
  baseApi = '/api/users'

  public updateAvatar(file: File) {
    return this.$request.setPath(`${this.baseApi}/updateAvatar`).upload(file, { avatar: file })
  }
}

export const UserApi = new UserApiInstance()
