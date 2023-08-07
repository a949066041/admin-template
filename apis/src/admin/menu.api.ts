import { ApiInstance } from '../instance'
import type { MenuList } from './menu.type'

class MenuApiInstance extends ApiInstance {
  public buildMenu() {
    return this.$request.setPath('/api/menus/build').get<MenuList[]>()
  }
}

export const MenuApi = new MenuApiInstance()
