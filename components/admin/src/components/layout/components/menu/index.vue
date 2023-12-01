<script lang="ts" setup>
import { getParents, useUserStore } from '@yy-admin/common-core'
import { useRoute, useRouter } from 'vue-router'
import type { ItemType } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import { useGlobalState } from '../../../../store/useGlobal'

defineOptions({
  name: 'YyMenu',
})
const openMenuKeys = ref<string[]>([])
const { globStore } = useGlobalState()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

function handleToRouter(route: ItemType) {
  if (route && route.key)
    router.push(route.key as string)
}

onMounted(() => {
  openMenuKeys.value.push(...getParents(userStore.userMenuList, route.path))
})

const currentRoute = computed(() => {
  return [route.path]
})
</script>

<template>
  <a-layout-sider v-model:collapsed="globStore.collapsed" class="h-screen overflow-hidden flex flex-col">
    <div class="logo h-64px  flex items-center bg-white justify-center text-8" @click="$router.push('/')">
      logo
    </div>
    <a-menu
      v-model:openKeys="openMenuKeys" :selected-keys="currentRoute"
      class="flex-1 overflow-auto" mode="inline" :items="userStore.userMenuList" @click="handleToRouter"
    />
  </a-layout-sider>
</template>
