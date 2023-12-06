<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
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
</script>

<template>
  <n-layout-header class=" flex justify-between">
    <n-breadcrumb class=" ml-4">
      <n-breadcrumb-item v-for="item of breadcrumbList" :key="item.path">
        <n-dropdown>
          <a type="link">
            {{ item.name }}
          </a>
          <template v-if="item.children && item.children.length > 0" #drop>
            <DropdownList>
              <DropdownItem v-for="innerItem of item.children" :key="innerItem.path" :name="innerItem.path">
                <a @click="$router.push(innerItem.path)">
                  {{ innerItem.name }}
                </a>
              </DropdownItem>
            </DropdownList>
          </template>
        </n-dropdown>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <n-dropdown :options="options" @select="handleSelectAction">
      <n-button>用户资料</n-button>
    </n-dropdown>
  </n-layout-header>
</template>
