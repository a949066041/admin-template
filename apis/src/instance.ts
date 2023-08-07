import { getRequest } from '@yy-web/request'

export abstract class ApiInstance<T extends object = object> {
  get $request() {
    return getRequest()!
  }

  public save(data: T) {
    return this.$request.setPath('xxx')
  }
}
