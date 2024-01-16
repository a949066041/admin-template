import { ApiInstance } from '../instance'
import type { IMenuEntity, IMenuTreeRecord, MenuList } from './menu.type'

class MenuApiInstance extends ApiInstance<IMenuEntity> {
  baseApi = '/api/menus'

  public buildMenu() {
    return this.$request.setPath(`${this.baseApi}/build`).get<MenuList[]>()
  }

  public menuLazy(pid?: number) {
    return this.$request.setPath(`${this.baseApi}/lazy`).get<IMenuTreeRecord[]>({ pid })
  }

  public list() {
    return this.$request.setPath(`${this.baseApi}/menuAll`).get<MenuList[]>()
  }

  public pageTree(params: Record<string, any>): Promise<IMenuTreeRecord[]> {
    return this.$request.setPath(this.baseApi)
      .get<{ totalElements: number, content: IMenuTreeRecord[] }>(params)
      .then((res) => {
        return res.content.map(item => ({ ...item, name: item.label, isLeaf: item.leaf, children: [] }))
      })
  }

  public superior(pid: number) {
    return this.$request.setPath(`${this.baseApi}/superior`).post<IMenuTreeRecord[]>([pid])
  }
}

export const MenuApi = new MenuApiInstance()
