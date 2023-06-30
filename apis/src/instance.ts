import type { IRequest } from '@yy-web/request'
import { getRequest } from '@yy-web/request'

export abstract class ApiInstance {
  public $request = getRequest as () => IRequest
}
