<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'
import { Message } from 'vexip-ui'
import { useRouter } from 'vue-router'
import { useGlobalState } from '../../../../store/useGlobal'
import { useBreadcrumb } from './useBreadcrumb'

defineOptions({
  name: 'YyHeader',
})

const { globStore } = useGlobalState()
const userStore = useUserStore()
const router = useRouter()
function handelLogoutUser() {
  userStore.logout().then(() => {
    Message.success('退出成功！')
    router.push('/login')
  })
}
const { breadcrumbList } = useBreadcrumb()
</script>

<template>
  <a-layout-header class=" flex justify-between items-center">
    <div class=" flex items-center">
      <i-iconoir:sidebar-collapse
        class=" text-lg cursor-pointer"
        :class="{ 'rotate-180': globStore.collapsed }"
        @click="globStore.collapsed = !globStore.collapsed"
      />
      <a-breadcrumb class=" ml-4">
        <a-breadcrumb-item v-for="item of breadcrumbList" :key="item.path">
          <a type="link">
            {{ item.name }}
          </a>
          <template v-if="item.children && item.children.length > 0" #overlay>
            <a-menu>
              <a-menu-item v-for="innerItem of item.children" :key="innerItem.path">
                <router-link :to="innerItem.path">
                  {{ innerItem.name }}
                </router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
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
