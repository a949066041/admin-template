import { ApiInstance } from '../instance'
import type { IDictDetail } from './dict-detail.type'

class DictDetailApiInstance extends ApiInstance<IDictDetail> {
  baseApi = '/api/dictDetail'

  public getDictList(dictName: string) {
    return this.$request.setPath(this.baseApi).get<{ content: IDictDetail[] }>({ dictName, page: 0, size: 9999 }, true).then(res => res.content)
  }

  public getDictMap(dictName: string | string[]) {
    dictName = Array.isArray(dictName) ? dictName : [dictName]
    return this.$request.setPath(`${this.baseApi}/map`)
      .get<Record<keyof typeof dictName, IDictDetail[]>>({ dictName: dictName.join(',') }, true)
  }
}

export const DictDetailApi = new DictDetailApiInstance()
