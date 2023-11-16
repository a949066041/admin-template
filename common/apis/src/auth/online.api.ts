import { ApiInstance } from '../instance'

class OnLineApiInstance extends ApiInstance {
  baseApi = '/auth/online'
}

export const OnLineApi = new OnLineApiInstance()
