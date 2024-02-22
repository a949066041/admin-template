<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTagStore } from '../../store/tag.store'
import YyHeader from './components/header/index.vue'
import YySider from './components/sider/index.vue'
import RouteTags from './components/tag/index.vue'

defineOptions({
  name: 'YyLayout',
})
const tagStore = useTagStore()

const route = useRoute()
const active = ref('')

watch(route, (val) => {
  active.value = val.meta.title as string
}, { immediate: true })
</script>

<template>
  <n-layout has-sider>
    <YySider />
    <n-layout>
      <YyHeader />
      <n-layout-content>
        <div class=" h-full overflow-hidden flex flex-col">
          <RouteTags />
          <div class=" overflow-auto p4 flex-1 box-border relative">
            <router-view v-if="!tagStore.refreshing" v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in" appear>
                <keep-alive :include="tagStore.keepAliveNames">
                  <component :is="tagStore.formatComponentInstance(Component, $route.path)" :key="$route.path" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </div>
      </n-layout-content>
      <n-layout-footer>©2024 Created by 洋洋得意</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style lang="less">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
