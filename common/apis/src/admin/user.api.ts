import type { UploadCb } from '../utils'
import type { EditUserData, IResetPwdData, IUserRecord } from './user.type'
import { ApiInstance } from '../instance'
import { uploadProgress } from '../utils'

class UserApiInstance extends ApiInstance<IUserRecord> {
  baseApi = '/api/users'

  public updateAvatar(file: File, cb: UploadCb) {
    return this.$request.setPath(`${this.baseApi}/updateAvatar`).setConfig({
      onUploadProgress: uploadProgress(cb),
    }).upload<{ avatar: string }>(file, { avatar: file })
  }

  public updatePassword(data: IResetPwdData) {
    return this.$request.setPath(`${this.baseApi}/updatePass`).post<void>(data)
  }

  public editUser(data: EditUserData) {
    return this.$request.setPath(`${this.baseApi}/center`).put<void>(data)
  }
}

export const UserApi = new UserApiInstance()
