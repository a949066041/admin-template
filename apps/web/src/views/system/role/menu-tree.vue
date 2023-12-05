<script lang="ts" setup>
import { ref } from 'vue'
import { MenuApi, type MenuList } from '@yy-admin/common-apis'
import { Tree } from 'vexip-ui'
import { flatChildrenArr } from '@yy-admin/common-core'

defineOptions({
  name: 'MenuTree',
})

const props = defineProps<{ checked: number[] }>()
const menuTreeRef = ref<InstanceType<typeof Tree>>()

const menuTree = ref<MenuList[]>([])
watch(() => props.checked, (val) => {
  const checked = menuTree.value.filter(item => val.includes(item.id!))

  handleSetTreeChecked(menuTree.value, false)
  handleSetTreeChecked(checked)
})

function handleSetTreeChecked(checked: MenuList[], checkFlag = true) {
  checked.forEach((item) => {
    menuTreeRef.value?.checkNodeByData(item, checkFlag)
  })
}

onMounted(async () => {
  const menuList = await MenuApi.list()
  menuTree.value = flatChildrenArr(menuList).map(item => ({ ...item, parent: item.pid }))
})
</script>

<template>
  <Tree ref="menuTreeRef" checkbox :data="menuTree" />
</template>
