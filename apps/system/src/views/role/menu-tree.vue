<script lang="ts" setup>
import { ref } from 'vue'
import { type IMenuEntity, MenuApi } from '@yy-admin/common-apis'
import { flatChildrenArr } from '@yy-admin/common-core'
import type { TreeInst } from 'naive-ui'

defineOptions({
  name: 'MenuTree',
})

const menuTree = ref<IMenuEntity[]>([])
const roleMenuChecked = ref<number[]>([])
const treeRef = ref<TreeInst>()

async function withCheckedChildrenPick(checked: number[]) {
  const menuList = await handleGetMenuTree()
  const flatMenuList = flatChildrenArr(menuList)

  // pick children
  const childrenChecked = flatMenuList.filter(item => !item.children).map(item => item.id).filter(id => checked.includes(id))
  roleMenuChecked.value = childrenChecked
}

async function handleGetMenuTree() {
  const menuList = await MenuApi.role()
  menuTree.value = menuList
  return menuList
}

onMounted(handleGetMenuTree)

function getCheckMenuTree() {
  const { keys = [] } = treeRef.value!.getIndeterminateData()
  return [...roleMenuChecked.value, ...keys] as number[]
}

defineExpose({
  withCheckedChildrenPick,
  getCheckMenuTree,
})
</script>

<template>
  <n-tree
    ref="treeRef"
    v-model:checked-keys="roleMenuChecked"
    default-expand-all
    class=" overflow-auto " block-line key-field="id"
    checkable
    cascade
    :selectable="false"
    :data="menuTree"
  />
</template>
