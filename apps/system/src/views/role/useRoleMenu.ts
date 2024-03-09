import { type IRoleRecord, RoleApi } from '@yy-admin/common-apis'
import { useAppConfigStore } from '@yy-admin/components-admin'
import type MenuTree from './menu-tree.vue'

export function useRoleMenu() {
  const menuTree = ref<InstanceType<typeof MenuTree>>()
  const currentRole = ref<number | null>(null)
  const { message } = useAppConfigStore()

  const isShowMenu = computed(() => {
    return currentRole.value !== null
  })
  function handleSetMenuCheck(id: IRoleRecord['id'], val: IRoleRecord['menus']) {
    currentRole.value = id

    nextTick(() => {
      menuTree.value?.withCheckedChildrenPick(val.map(item => item.id))
    })
  }

  function handleSaveRoleMenu(cb?: () => void) {
    RoleApi.menu(currentRole.value!, menuTree.value!.getCheckMenuTree()).then(() => {
      message.success('保存成功')
      cb?.()
    })
  }

  return {
    menuTree,
    handleSaveRoleMenu,
    isShowMenu,
    handleSetMenuCheck,
  }
}
