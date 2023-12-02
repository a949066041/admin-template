<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeProps } from 'ant-design-vue'
import { MenuApi } from '@yy-admin/common-apis'
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'MenuTree',
})

const props = defineProps<{ checked: number[] }>()

const bindValue = useVModel(props, 'checked')

const menuTree = ref<(TreeProps['treeData'])>([])

async function handleLazyMenu(pid: number) {
  return []
  // const menuList = await MenuApi.list()
  // const covertList = menuList.map(item => ({ key: item.id!, title: item.title, isLeaf: !item.hasChildren }))
  // if (pid === 0)
  //   menuTree.value = covertList
  // return covertList
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
</script>

<template>
  {{ bindValue }}
  <a-tree
    v-model:checkedKeys="bindValue"
    show-line
    :show-icon="false"
    :load-data="onLoadData"
    checkable
    :tree-data="menuTree"
  />
</template>
