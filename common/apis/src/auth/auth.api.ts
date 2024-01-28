import { ApiInstance } from '../instance'
import type { AuthCode, Login, LoginForm, UserInfo } from './auth.type'

const baseUrl = '/auth'

class AuthtApiInstance extends ApiInstance {
  public login(form: LoginForm) {
    return this.$request.setPath(`${baseUrl}/login`).post<Login>(form)
  }

  public logout() {
    return this.$request.setPath(`${baseUrl}/logout`).del()
  }

  public code() {
    return this.$request.setPath(`${baseUrl}/code`).get<AuthCode>()
  }

  public info() {
    return this.$request.setPath(`${baseUrl}/info`).get<UserInfo>()
  }
}

export const AuthApi = new AuthtApiInstance()
