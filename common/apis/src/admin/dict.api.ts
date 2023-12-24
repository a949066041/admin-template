import { ApiInstance } from '../instance'
import type { IDictEntity } from './dict.type'

class DictApiInstance extends ApiInstance<IDictEntity> {
  baseApi = '/api/dict'
}

export const DictApi = new DictApiInstance()
