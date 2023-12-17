import { type IRole, RoleApi } from '@yy-admin/common-apis'
import { useAppConfigStore } from '@yy-admin/components-admin'

export function useRoleMenu() {
  const checkMenu = ref<number[]>([])
  const currentRole = ref<number | null>(null)
  const { message } = useAppConfigStore()

  const isShowMenu = computed(() => {
    return currentRole.value !== null
  })
  function handleSetMenuCheck(id: IRole['id'], val: IRole['menus']) {
    currentRole.value = id
    checkMenu.value = val.map(item => item.id)
  }

  function handleSaveRoleMenu(cb?: () => void) {
    RoleApi.menu(currentRole.value, checkMenu.value).then(() => {
      message.success('保存成功')
      cb?.()
    })
  }

  return {
    handleSaveRoleMenu,
    isShowMenu,
    checkMenu,
    handleSetMenuCheck,
  }
}
