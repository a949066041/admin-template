<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@yy-admin/common-core'
import { Message } from 'vexip-ui'
import { useTagStore } from '../../store/tag.store'
import YyHeader from './components/header/index.vue'
import RouteTags from './components/tag/index.vue'

defineOptions({
  name: 'YyLayout',
})
const tagStore = useTagStore()
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()
const active = ref('')

watch(route, (val) => {
  active.value = val.meta.title as string
}, { immediate: true })

function handleToRouter(_: string, meta: { key: string }) {
  if (meta && meta.key)
    router.push(meta.key)
}

const showAside = ref(false)

function handleUserAction(label: string) {
  if (label === 'signOut') {
    userStore.logout().then(() => {
      Message.success('退出成功！')
      router.push('/login')
    })
  }
}
</script>

<template>
  <Layout
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :no-aside="!showAside"
    :menus="userStore.userMenuList"
    :config="['color']"
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
          <transition name="fade">
            <keep-alive :include="tagStore.keepAliveNames">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </template>
  </Layout>
</template>
