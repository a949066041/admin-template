<script lang="ts" setup>
import { watchOnce } from '@vueuse/shared'
import { watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { useTagStore } from '../../../../store/tag.store'

defineOptions({
  name: 'RouteTags',
})

const tagStore = useTagStore()

const route = useRoute()
const router = useRouter()
watch(() => tagStore.activeTag, (tag) => {
  if (tag)
    router.push(tag)
})

function handleAddTag(routeInfo: RouteLocationNormalizedLoaded) {
  tagStore.addTag({ path: routeInfo.path, title: routeInfo.meta.title as string, affix: !!routeInfo.meta.affix, name: routeInfo.name as string })
}

watchOnce(() => route, handleAddTag, { immediate: true })
router.afterEach(handleAddTag)
</script>

<template>
  <a-tabs
    v-model:activeKey="tagStore.activeTag"
    type="card" class="!mb-0"
    @tab-click="tagStore.switchTag"
  >
    <a-tab-pane v-for="item of tagStore.tagList" :key="item.path">
      <template #tab>
        <a-dropdown :trigger="['contextmenu']">
          <div class="router-tab flex items-center">
            <span>
              {{ item.title }}
            </span>
            <i-carbon:close-outline v-if="!item.affix" class="router-tab__icon" @click.stop="tagStore.closeTag(item.path)" />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item v-if="item.path === tagStore.activeTag" @click="tagStore.refresh(item.name)">
                刷新
              </a-menu-item>
              <a-menu-item @click="tagStore.closeAll">
                关闭全部
              </a-menu-item>
              <a-menu-item @click="tagStore.closeTag(item.path)">
                关闭
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
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
