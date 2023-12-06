<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  <n-layout>
    <YyHeader />
    <n-layout has-sider>
      <YySider />
      <n-layout-content>
        <RouteTags />
        <div class=" overflow-hidden p4">
          <router-view v-slot="{ Component }">
            <transition name="vxp-move-bottom">
              <keep-alive :include="tagStore.keepAliveNames">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
        <n-layout-footer>©2023 Created by 洋洋得意</n-layout-footer>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <!-- <Layout
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :no-aside="!showAside"
    :menus="userStore.userMenuList"
    :config="['color', 'theme']"
    :actions="[{
      label: 'signOut',
      name: '退出登录',
    }]"
    copyright="©2023 Created by 洋洋得意"
    :menu-props="{ active }"
    fit-window
    @menu-select="handleToRouter"
    @user-action="handleUserAction"
  >
    <template #header-right>
      <YyHeader v-model:showAside="showAside" />
    </template>
    <template #main>
      <RouteTags />
      <div class=" overflow-hidden p4">
        <router-view v-slot="{ Component }">
          <transition name="vxp-move-bottom">
            <keep-alive :include="tagStore.keepAliveNames">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </template>
  </Layout> -->
</template>
