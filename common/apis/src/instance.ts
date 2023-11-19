import { getRequest } from '@yy-web/request'
import type { AppendToObject, Merge } from './utils/index'

export abstract class ApiInstance<T extends object = object, K extends string = 'id', U extends object = object> {
  baseApi = ''
  get $request() {
    return getRequest()!
  }

  constructor() {
    this.findId = this.findId.bind(this)
    this.page = this.page.bind(this)
    this.save = this.save.bind(this)
    this.put = this.put.bind(this)
    this.del = this.del.bind(this)
  }

  public findId(id: number) {
    return this.$request.setPath(`${this.baseApi}/{id}`).carry(id).get<T>()
  }

  public page(params: Record<string, any>) {
    return this.$request.setPath(this.baseApi).get<{ totalElements: number, content: T[] }>(params)
  }

  public save(data: Partial<Merge<AppendToObject<T, K, number>, U>>) {
    return this.$request.setPath(this.baseApi).post<void>(data)
  }

  public put(data: Partial<Merge<AppendToObject<T, K, string>, U>>) {
    return this.$request.setPath(this.baseApi).put<void>(data)
  }

  public del(id: string | number) {
    return this.$request.setPath(this.baseApi).del<boolean>([id])
  }
}
