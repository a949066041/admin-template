<script lang="ts" setup>
import { useConfigStore, useUserStore } from '@yy-admin/common-core'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import ThemeToggle from '../../../theme-toggle/index.vue'
import type { IRouteBreadcrumbItem } from './useBreadcrumb'
import { useBreadcrumb } from './useBreadcrumb'

defineOptions({
  name: 'YyHeader',
})

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
const { collapseMenu, handleToggleMenu } = useConfigStore()
const router = useRouter()
const message = useMessage()
const userStore = useUserStore()
const options = [
  {
    label: '个人中心',
    key: 'user',
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]

function handleSelectAction(key: typeof options[number]['key']) {
  if (key === 'logout') {
    userStore.logout().then(() => {
      message.success('退出成功！')
      router.push('/login')
    })
    return
  }
  if (key === 'user')
    router.push('/ext/setting')
}

const { breadcrumbList } = useBreadcrumb()

function handleSelectMenu(key: string) {
  router.push(key)
}

function handleToMenu(breadcrumbItem: IRouteBreadcrumbItem) {
  if (breadcrumbItem.key === '/')
    handleSelectMenu('/')
}
</script>

<template>
  <n-layout-header class=" flex justify-between h-15 items-center px-4">
    <div class=" flex items-center">
      <i class=" cursor-pointer text-lg i-iconoir:sidebar-collapse" :class=" collapseMenu && 'rotate-[180deg]'" @click="handleToggleMenu()" />
      <n-breadcrumb class=" ml-2">
        <n-breadcrumb-item v-for="item of breadcrumbList" :key="item.key">
          <n-dropdown :options="item.children" @select="handleSelectMenu">
            <a type="link" @click="handleToMenu(item)">
              <Transition>
                {{ item.label }}
              </Transition>
            </a>
          </n-dropdown>
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="flex items-center">
      <n-space>
        <div class=" text-xl cursor-pointer" :class=" isFullscreen ? 'i-dashicons:fullscreen-exit-alt' : 'i-lets-icons:full-alt'" @click="toggleFullscreen()" />

        <ThemeToggle v-slot="{ toggle }" class=" flex items-center">
          <div i-carbon-sun dark:i-carbon-moon translate-y--1px class=" text-xl cursor-pointer" @click="toggle" />
        </ThemeToggle>
      </n-space>
      <n-divider vertical />
      <n-dropdown :options="options" trigger="click" @select="handleSelectAction">
        <div class="flex items-center cursor-pointer">
          <n-avatar :src="userStore.avatar" round />
          <i class=" text-xl i-ri:arrow-drop-down-line" />
        </div>
      </n-dropdown>
    </div>
  </n-layout-header>
</template>
