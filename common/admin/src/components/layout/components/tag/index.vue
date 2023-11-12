<script lang="ts" setup>
import { watchOnce } from '@vueuse/shared'
import { ref, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'RouteTags',
})

const activeKey = ref('')
const route = useRoute()
const router = useRouter()
const tagList = ref<{ path: string; title: string; affix?: boolean }[]>([])

function handleAddTag(routeInfo: RouteLocationNormalizedLoaded) {
  activeKey.value = routeInfo.path
  if (tagList.value.find(item => item.path === routeInfo.path))
    return

  tagList.value.push({ path: routeInfo.path, title: routeInfo.meta.title as string, affix: !!routeInfo.meta.affix })
}

function handleDelTag(path: string) {
  tagList.value = tagList.value.filter(item => item.path !== path)
}

watchOnce(() => route, handleAddTag, { immediate: true })

function handleSwitchRoute(value: string) {
  if (activeKey.value !== value) {
    activeKey.value = value
    router.push(value)
  }
}

router.afterEach(handleAddTag)
</script>

<template>
  <a-tabs
    v-model:activeKey="activeKey" type="card" class="!mb-0"
    @tab-click="handleSwitchRoute"
  >
    <a-tab-pane v-for="item of tagList" :key="item.path">
      <template #tab>
        <div class="router-tab flex items-center">
          <span>
            {{ item.title }}
          </span>
          <i-carbon:close-outline v-if="!item.affix" class="router-tab__icon" @click="handleDelTag(item.path)" />
        </div>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped lang="less">
.router-tab {
  &:hover {
    .router-tab__icon {
      @apply block;
    }
  }

  &__icon {
    @apply cursor-pointer ml-2;
  }
}
</style>
