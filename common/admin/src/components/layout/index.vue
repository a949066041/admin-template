<script setup lang="ts">
import YyMenu from './components/menu/index.vue'
import YyHeader from './components/header/index.vue'

defineOptions({
  name: 'YyLayout',
})
</script>

<template>
  <a-layout style="min-height: 100vh">
    <YyMenu />
    <a-layout class="flex flex-col h-screen">
      <YyHeader />
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
