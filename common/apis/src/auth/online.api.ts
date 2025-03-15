import type { IOnline } from './online.type'
import { ApiInstance } from '../instance'

class OnLineApiInstance extends ApiInstance<IOnline> {
  baseApi = '/auth/online'
}

export const OnLineApi = new OnLineApiInstance()
