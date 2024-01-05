<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import ThemeToggle from '../../../theme-toggle/index.vue'
import type { IRouteBreadcrumbItem } from './useBreadcrumb'
import { useBreadcrumb } from './useBreadcrumb'

defineOptions({
  name: 'YyHeader',
})

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()
const options = [
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
  <n-layout-header class=" flex justify-between h-15 items-center">
    <n-breadcrumb class=" ml-4">
      <n-breadcrumb-item v-for="item of breadcrumbList" :key="item.key">
        <n-dropdown :options="item.children" @select="handleSelectMenu">
          <a type="link" @click="handleToMenu(item)">
            {{ item.label }}
          </a>
        </n-dropdown>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <ThemeToggle v-slot="{ toggle }">
      <span @click="toggle">
        <div i-carbon-sun dark:i-carbon-moon translate-y--1px />
      </span>
    </ThemeToggle>
    <n-dropdown :options="options" @select="handleSelectAction">
      <n-button>用户资料</n-button>
    </n-dropdown>
  </n-layout-header>
</template>
