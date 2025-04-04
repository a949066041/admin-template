<script lang="ts" setup>
import type { IRouteBreadcrumbItem } from './useBreadcrumb'
import { useFullscreen } from '@vueuse/core'
import { useConfigStore, useUserStore } from '@yy-admin/common-core'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import ThemeToggle from '../../../theme-toggle/index.vue'
import { useBreadcrumb } from './useBreadcrumb'

defineOptions({
  name: 'YyHeader',
})

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
const configStore = useConfigStore()
const router = useRouter()
const message = useMessage()
const { logout, avatar } = useUserStore()
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
    logout().then(() => {
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
      <i class=" cursor-pointer text-lg i-iconoir:sidebar-collapse" :class=" configStore.collapseMenu && 'rotate-[180deg]'" @click="configStore.handleToggleMenu()" />
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
          <div class=" text-xl cursor-pointer i-line-md:sun-rising-loop dark:i-line-md:moon-rising-loop translate-y--1px" @click="toggle" />
        </ThemeToggle>
      </n-space>
      <n-divider vertical />
      <n-dropdown :options="options" trigger="click" @select="handleSelectAction">
        <div class="flex items-center cursor-pointer">
          <n-avatar :src="avatar" round />
          <i class=" text-xl i-ri:arrow-drop-down-line" />
        </div>
      </n-dropdown>
    </div>
  </n-layout-header>
</template>
