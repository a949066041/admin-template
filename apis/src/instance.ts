import { getRequest } from '@yy-web/request'

type basicKeyType = string | number | symbol

type AppendToObject<T, K extends basicKeyType, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}

export abstract class ApiInstance<T extends object = object, K extends string = 'id'> {
  baseApi = ''
  get $request() {
    return getRequest()!
  }

  public save(data: Partial<AppendToObject<T, K, string>>) {
    return this.$request.setPath(this.baseApi).post<void>(data)
  }

  public put(data: Partial<AppendToObject<T, K, string>>) {
    return this.$request.setPath(this.baseApi).put<void>(data)
  }
}
