<script lang="ts" setup>
import { ref } from 'vue'
import { MenuApi, type MenuList } from '@yy-admin/common-apis'

defineOptions({
  name: 'MenuTree',
})

const props = defineProps<{ checked: number[] }>()

const bindCheck = useVModel(props, 'checked')
const menuTree = ref<MenuList[]>([])

onMounted(async () => {
  const menuList = await MenuApi.list()
  menuTree.value = menuList
})
</script>

<template>
  <n-tree
    v-model:checked-keys="bindCheck" block-line key-field="id"
    checkable
    :selectable="false" :data="menuTree"
  />
</template>
