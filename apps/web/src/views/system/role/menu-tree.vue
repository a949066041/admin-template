<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeProps } from 'ant-design-vue'
import { MenuApi } from '@yy-admin/common-apis'

defineOptions({
  name: 'MenuTree',
})

const menuTree = ref<(TreeProps['treeData'])>([])

async function handleLazyMenu(pid: number) {
  const menuList = await MenuApi.menuLazy(pid)
  const covertList = menuList.map(item => ({ key: item.id!, title: item.title, isLeaf: !item.hasChildren }))
  if (pid === 0)
    menuTree.value = covertList
  return covertList
}

const onLoadData: TreeProps['loadData'] = (treeNode) => {
  return new Promise<void>((resolve) => {
    if (treeNode.dataRef!.children) {
      resolve()
      return
    }
    handleLazyMenu(treeNode.dataRef!.key as number).then((res) => {
      treeNode.dataRef!.children = res
      menuTree.value = [...menuTree.value as any]
      resolve()
    })
  })
}

handleLazyMenu(0)

const checkedKeys = ref<TreeProps['checkedKeys']>({ checked: [44, 45], halfChecked: [2, 1] })
</script>

<template>
  {{ checkedKeys }}
  <a-tree
    v-model:checkedKeys="checkedKeys"
    show-line
    :show-icon="false"
    check-strictly
    :load-data="onLoadData"
    checkable
    :tree-data="menuTree"
  />
</template>
