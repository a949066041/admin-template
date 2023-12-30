<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'
import { useRoute, useRouter } from 'vue-router'
import type { MenuInst } from 'naive-ui'
import { h, nextTick, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'YySider',
})

const router = useRouter()
const route = useRoute()

const activePath = ref('')
const userStore = useUserStore()
const menuInstRef = ref<MenuInst | null>(null)

function handleToggleMenu() {
  nextTick(() => {
    menuInstRef.value?.showOption(activePath.value)
  })
}

function handleRenderIcon(options: any) {
  return h('i', { class: `i-custom:${options.meta.icon}` })
}

watch(activePath, (val) => {
  router.push(val)
  handleToggleMenu()
})

onMounted(() => {
  activePath.value = route.path
  handleToggleMenu()
})
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="false"
    class="h-100vh"
  >
    <n-menu
      ref="menuInstRef"
      v-model:value="activePath"
      :icon-size="16"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :render-icon="handleRenderIcon"
      :options="userStore.userMenuList"
    />
  </n-layout-sider>
</template>
