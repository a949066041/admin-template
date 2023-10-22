import { ApiInstance } from '../instance'
import type { IDict } from './dict.type'

class DictApiInstance extends ApiInstance<IDict> {
  baseApi = '/api/dict'
}

export const DictApi = new DictApiInstance()
