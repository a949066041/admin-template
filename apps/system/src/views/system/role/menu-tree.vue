<script lang="ts" setup>
import { ref } from 'vue'
import { type IMenuLazy, MenuApi } from '@yy-admin/common-apis'

defineOptions({
  name: 'MenuTree',
})

const props = defineProps<{ checked: number[] }>()

interface IRenderMenuTree extends IMenuLazy {
  isLeaf: boolean
  children?: IRenderMenuTree[]
}

const bindCheck = useVModel(props, 'checked')
const menuTree = ref<IRenderMenuTree[]>([])

// TODO
function handleLoadMenu(node: IRenderMenuTree | any) {
  return new Promise<void>((resolve) => {
    MenuApi.menuLazy(node.id).then((res) => {
      node.children = res.map(item => ({ ...item, isLeaf: item.leaf }))
      resolve()
    })
  })
}

onMounted(async () => {
  const menuList = await MenuApi.menuLazy(0)
  menuTree.value = menuList.map(item => ({ ...item, isLeaf: item.leaf }))
})
</script>

<template>
  <n-tree
    v-model:checked-keys="bindCheck" block-line key-field="id"
    :on-load="handleLoadMenu"
    checkable
    :selectable="false"
    :data="menuTree"
  />
</template>
