import type { IDictDetailEntity } from './dict-detail.type'
import { ApiInstance } from '../instance'

class DictDetailApiInstance extends ApiInstance<IDictDetailEntity> {
  baseApi = '/api/dictDetail'

  public getDictList(dictName: string) {
    return this.$request.setPath(this.baseApi).get<{ content: IDictDetailEntity[] }>({ dictName, page: 0, size: 9999 }, true).then(res => res.content)
  }

  public getDictMap(dictName: string | string[]) {
    dictName = Array.isArray(dictName) ? dictName : [dictName]
    return this.$request.setPath(`${this.baseApi}/map`)
      .get<Record<keyof typeof dictName, IDictDetailEntity[]>>({ dictName: dictName.join(',') }, true)
  }

  public del(id: string | number) {
    return this.$request.setPath(`${this.baseApi}/{id}`).carry(id).del<boolean>([id])
  }
}

export const DictDetailApi = new DictDetailApiInstance()
