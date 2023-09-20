<script setup lang="ts">
import { ref } from 'vue'
import { useAnimate } from '@vueuse/core'
import YyMenu from './components/menu/index.vue'
import YyHeader from './components/header/index.vue'

defineOptions({
  name: 'YyLayout',
})
const menu = ref<HTMLElement | null>(null)
const top = ref<HTMLElement | null>(null)

useAnimate(top, [
  { transform: 'translateY(-100%)' },
  { transform: 'translateY(10px)' },
  { transform: 'translateX(0)' },
], 800)

useAnimate(menu, [
  { transform: 'translateX(-100%)' },
  { transform: 'translateX(10px)' },
  { transform: 'translateX(0)' },
], 800)
</script>

<template>
  <a-layout style="min-height: 100vh">
    <YyMenu ref="menu" />
    <a-layout class="flex flex-col h-screen">
      <YyHeader ref="top" />
      <a-layout-content class="flex-1 overflow-auto">
        <div class=" overflow-hidden p4">
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

<style scoped>
:deep(.ant-layout-sider-children) {
  @apply flex flex-col;
}
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
