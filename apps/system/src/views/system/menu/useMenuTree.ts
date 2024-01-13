import { type IMenuTreeRecord, MenuApi } from '@yy-admin/common-apis'
import { recursiveLeafArr } from '@yy-admin/common-utils'

const ROOT_MENU = {
  id: 0,
  name: '顶级菜单',
  isLeaf: false,
} as unknown as IMenuTreeRecord

export function useMenuTree() {
  const menuTreeData = ref<IMenuTreeRecord[]>([])
  function handleLazyMenu(node: IMenuTreeRecord & any) {
    return new Promise<void>((resolve) => {
      MenuApi.menuLazy(node.id).then((res) => {
        node.children = recursiveLeafArr(res)
        resolve()
      })
    })
  }

  function triggerMenuTree(isAdd: boolean, pid?: number | null) {
    if (isAdd || !pid) {
      menuTreeData.value = [ROOT_MENU]
      return
    }
    MenuApi.superior(pid!).then((res) => {
      menuTreeData.value = [{ ...ROOT_MENU, leaf: true, children: recursiveLeafArr(res) }]
    })
  }

  return {
    menuTreeData,
    triggerMenuTree,
    handleLazyMenu,
  }
}
