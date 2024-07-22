<script lang="ts" setup>
import { useConfigStore, useUserStore } from '@yy-admin/common-core'
import { useRoute, useRouter } from 'vue-router'
import type { MenuInst } from 'naive-ui'
import { h, nextTick, ref } from 'vue'
import type { IMenuBuild } from '@yy-admin/common-apis'
import { useEventListener, watchImmediate } from '@vueuse/core'

defineOptions({
  name: 'YySider',
})

const router = useRouter()
const route = useRoute()
const configStore = useConfigStore()

const activePath = ref('')
const userStore = useUserStore()
const menuInstRef = ref<MenuInst | null>(null)

function handleToggleMenu() {
  nextTick(() => {
    menuInstRef.value?.showOption(activePath.value)
  })
}

function handleRenderIcon(options: IMenuBuild) {
  return h('i', { class: `i-custom:${options.meta.icon}` })
}

function handleRenderLabel(options: IMenuBuild) {
  return h('span', { class: 'text-truncate' }, options.meta.title)
}

watchImmediate(route, () => {
  activePath.value = route.path
  handleToggleMenu()
})

const isFixed = ref(window.innerWidth < 760)
function setFixed() {
  nextTick(() => {
    isFixed.value = window.innerWidth < 760
  })
}
useEventListener('resize', setFixed)
</script>

<template>
  <n-layout-sider
    v-show="!isFixed || (isFixed && !configStore.collapseMenu)"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="configStore.collapseMenu"
    class="h-100vh"
    :class="isFixed && '!fixed z-3001'"
  >
    <div class="logo h-15 leading-15  text-center flex items-center justify-center">
      <img src="https://www.naiveui.com/assets/naivelogo-XQ1U1Js8.svg" class=" w-5 h-5" :class=" configStore.collapseMenu && 'w-6 h-6'" alt="logo">
      <div v-if="!configStore.collapseMenu" class=" text-lg ml-2">
        YydyAdmin
      </div>
    </div>
    <n-menu
      ref="menuInstRef"
      :value="activePath"
      :collapsed="configStore.collapseMenu"
      :icon-size="16"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :render-icon="handleRenderIcon"
      :render-label="handleRenderLabel"
      :options="userStore.userMenuList"
      @update:value="(val: string) => router.push(val)"
    />
  </n-layout-sider>
  <Teleport v-if="isFixed && !configStore.collapseMenu" to="body">
    <div class="n-modal-mask z-3000" @click="configStore.handleToggleMenu(true)" />
  </Teleport>
</template>
