<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
import { genComponents } from '@/utils'

defineOptions({
  name: 'DocRouter',
})

const route = useRoute()
const activeMenu = ref('')
const menuList = ref(Object.values(Object.keys(genComponents()).reduce((arr, value) => {
  const [chunk, name] = value.split('/')

  if (!arr[chunk]) {
    arr[chunk] = {
      type: 'group',
      label: chunk,
      key: chunk,
      children: [],
    } as MenuOption
  }
  arr[chunk].children!.push({ label: name, key: `/${value}` })
  return arr
}, {} as Record<string, MenuOption>)))

onMounted(() => {
  activeMenu.value = route.path
})
</script>

<template>
  <n-menu
    v-model:value="activeMenu"
    class=" w-[200px] h-full overscroll-auto"
    :options="menuList"
    @update-value="$router.push"
  />
</template>
