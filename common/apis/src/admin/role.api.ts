import { ApiInstance } from '../instance'
import type { IRole } from './role.type'

const baseApi = '/api/roles'

class RoleApiInstance extends ApiInstance<IRole> {
  baseApi = baseApi

  public all() {
    return this.$request.setPath(`${this.baseApi}/all`).get<IRole[]>(true)
  }

  public menu(id: number, menuList: number[]) {
    return this.$request.setPath(`${this.baseApi}/menu`).put<void>({ id, menus: menuList.map(item => ({ id: item })) })
  }
}

export const RoleApi = new RoleApiInstance()
