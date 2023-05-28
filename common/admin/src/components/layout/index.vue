<script setup lang="ts">
import { useUserStore } from '@yy-admin/common-core'
import { useRouter } from 'vue-router'
import type { ItemType } from 'ant-design-vue'
import { useGlobalState } from '../../store/useGlobal'

const globalState = useGlobalState()
const userStore = useUserStore()
const router = useRouter()

function handleToRouter(route: ItemType) {
  if (route && route.key)
    router.push(route.key as string)
}

defineOptions({
  name: 'YyLayout',
})
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="globalState.collapsed" collapsible>
      <div class="logo h-64px bg-white flex items-center justify-center text-8 color-red">
        logo
      </div>
      <a-menu mode="inline" theme="dark" :items="userStore.userMenuList" @click="handleToRouter" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header />
      <a-layout-content>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view v-slot="{ Component }">
            <transition name="slide">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2023 Created by 洋洋得意
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all .5s;
}

.slide-enter-to {
  transform: translateX(20px);
}

.slide-leave-to {
  transform: translateX(0);
}
</style>
