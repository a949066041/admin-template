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
    key: '/user',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]

function handleSelectAction(key: string) {
  if (key === 'logout') {
    userStore.logout().then(() => {
      message.success('退出成功！')
      router.push('/login')
    })
  }
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
      <i-iconoir:sidebar-collapse class=" cursor-pointer" :class=" collapseMenu && 'rotate-[180deg]'" @click="handleToggleMenu()" />
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
    <n-space class="flex items-center">
      <div class=" text-xl cursor-pointer" :class=" isFullscreen ? 'i-dashicons:fullscreen-exit-alt' : 'i-lets-icons:full-alt'" @click="toggleFullscreen()" />

      <ThemeToggle v-slot="{ toggle }" class=" flex items-center">
        <div i-carbon-sun dark:i-carbon-moon translate-y--1px class=" text-xl cursor-pointer" @click="toggle" />
      </ThemeToggle>
      <n-dropdown :options="options" @select="handleSelectAction">
        <n-avatar class=" flex items-center">
          {{ userStore.userInfo?.user.nickName }}
        </n-avatar>
      </n-dropdown>
    </n-space>
  </n-layout-header>
</template>
