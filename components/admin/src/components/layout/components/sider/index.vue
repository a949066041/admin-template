<script lang="ts" setup>
import type { IMenuBuild } from '@yy-admin/common-apis'
import type { MenuInst } from 'naive-ui'
import { useEventListener, watchImmediate } from '@vueuse/core'
import { useConfigStore, useUserStore } from '@yy-admin/common-core'
import { h, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'YySider',
})

const router = useRouter()
const route = useRoute()
const { collapseMenu, handleToggleMenu } = useConfigStore()

const activePath = ref('')
const { userMenuList } = useUserStore()
const menuInstRef = ref<MenuInst | null>(null)

function handleRenderIcon(options: IMenuBuild) {
  return h('i', { class: `i-custom:${options.meta.icon}` })
}

function handleRenderLabel(options: IMenuBuild) {
  return h('span', { class: 'text-truncate' }, options.meta.title)
}

watchImmediate(route, () => {
  activePath.value = route.path
  nextTick(() => {
    menuInstRef.value?.showOption(activePath.value)
  })
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
    v-show="!isFixed || (isFixed && !collapseMenu)"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapseMenu"
    class="h-100vh"
    :class="isFixed && '!fixed z-3001'"
  >
    <div class="logo h-15 leading-15  text-center flex items-center justify-center">
      <div class="i-logos:naiveui w-5 h-5" :class=" collapseMenu && 'w-6 h-6'" />
      <div v-if="!collapseMenu" class=" text-lg ml-2">
        YydyAdmin
      </div>
    </div>
    <n-menu
      ref="menuInstRef"
      :value="activePath"
      :collapsed="collapseMenu"
      :icon-size="16"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :render-icon="handleRenderIcon"
      :render-label="handleRenderLabel"
      :options="userMenuList"
      @update:value="(val: string) => router.push(val)"
    />
  </n-layout-sider>
  <Teleport v-if="isFixed && !collapseMenu" to="body">
    <div class="n-modal-mask z-3000" @click="handleToggleMenu(true)" />
  </Teleport>
</template>
