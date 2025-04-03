import type { IDictEntity } from './dict.type'
import { ApiInstance } from '../instance'

class DictApiInstance extends ApiInstance<IDictEntity> {
  baseApi = '/api/dict'
}

export const DictApi = new DictApiInstance()
