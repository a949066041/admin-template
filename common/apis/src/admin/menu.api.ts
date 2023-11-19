import { ApiInstance } from '../instance'
import type { MenuList } from './menu.type'

class MenuApiInstance extends ApiInstance {
  baseApi = '/api/menus'
  public buildMenu() {
    return this.$request.setPath(`${this.baseApi}/build`).get<MenuList[]>()
  }

  public menuLazy(pid?: number) {
    return this.$request.setPath(`${this.baseApi}/lazy`).get<MenuList[]>({ pid })
  }

  public list() {
    return this.$request.setPath(`${this.baseApi}`).get<MenuList[]>()
  }
}

export const MenuApi = new MenuApiInstance()
