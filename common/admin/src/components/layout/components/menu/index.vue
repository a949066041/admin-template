<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'
import { useRouter } from 'vue-router'
import type { ItemType } from 'ant-design-vue'
import { useGlobalState } from '../../../../store/useGlobal'

defineOptions({
  name: 'YyMenu',
})
const { globStore } = useGlobalState()
const userStore = useUserStore()
const router = useRouter()

function handleToRouter(route: ItemType) {
  if (route && route.key)
    router.push(route.key as string)
}
</script>

<template>
  <a-layout-sider v-model:collapsed="globStore.collapsed" class="h-screen overflow-hidden flex flex-col">
    <div class="logo h-64px bg-white flex items-center justify-center text-8" @click="$router.push('/')">
      logo
    </div>
    <a-menu class="flex-1 overflow-auto" mode="inline" theme="dark" :items="userStore.userMenuList" @click="handleToRouter" />
  </a-layout-sider>
</template>
