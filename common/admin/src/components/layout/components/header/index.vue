<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
function handelLogoutUser() {
  userStore.logout().then(() => {
    message.success('退出成功！')
    router.push('/login')
  })
}

defineOptions({
  name: 'YyHeader',
})
</script>

<template>
  <a-layout-header class=" flex justify-end items-center">
    <a-dropdown>
      <a-avatar class="bg-white text-#000">
        Hi
      </a-avatar>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="handelLogoutUser">
            <a href="javascript:;">退出</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>
