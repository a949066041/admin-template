import { ApiInstance } from '../instance'
import type { IOnline } from './online.type'

class OnLineApiInstance extends ApiInstance<IOnline> {
  baseApi = '/auth/online'
}

export const OnLineApi = new OnLineApiInstance()
