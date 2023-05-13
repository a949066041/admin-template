<script setup lang="ts">
import { useUserStore } from '@yy-admin/common-core'
import { useGlobalState } from '../../store/useGlobal'

const globalState = useGlobalState()
const userStore = useUserStore()
</script>

<script lang="ts">
export default {
  name: 'YyLayout',
}
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="globalState.collapsed" collapsible>
      <div class="logo h-64px bg-white flex items-center justify-center text-8 color-red">
        logo
      </div>
      <a-menu mode="inline" theme="dark">
        <a-sub-menu v-for="item of userStore.userMenuList" :key="item.path">
          <template #title>
            {{ item.meta.title }}
          </template>
          <a-menu-item v-for="innerChildren of (item.children || [])" :key="innerChildren.path" @click="$router.push(`${innerChildren.path}`)">
            {{ innerChildren.meta.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header />
      <a-layout-content>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <Transition name="slide">
            <router-view />
          </Transition>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
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
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
