<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAnimate } from '@vueuse/core'
import { useRoute } from 'vue-router'
import YyMenu from './components/menu/index.vue'
import YyHeader from './components/header/index.vue'
import RouteTags from './components/tag/index.vue'

defineOptions({
  name: 'YyLayout',
})
const menu = ref<HTMLElement | null>(null)
const top = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const route = useRoute()

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

const { play } = useAnimate(content, [
  { opacity: '0.5' },
  { opacity: '1' },
], 800)

watch(route, play, { immediate: true })
</script>

<template>
  <a-layout style="min-height: 100vh">
    <YyMenu ref="menu" />
    <a-layout class="flex flex-col h-screen">
      <YyHeader ref="top" />
      <RouteTags />
      <a-layout-content class="flex-1 overflow-auto">
        <div ref="content" class=" overflow-hidden p4">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
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
