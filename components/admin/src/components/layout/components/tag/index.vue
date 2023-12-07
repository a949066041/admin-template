<script lang="ts" setup>
import { watchOnce } from '@vueuse/shared'
import { watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { useTagStore } from '../../../../store/tag.store'
import { useContextTag } from './useContextTag'

defineOptions({
  name: 'RouteTags',
})

const tagStore = useTagStore()
const {
  bindDrop,
  handleOpenMenu,
} = useContextTag()

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
  <n-tabs v-model:value="tagStore.activeTag" type="card" animated>
    <n-tab v-for="item of tagStore.tagList" :key="item.path" :name="item.path" @contextmenu="handleOpenMenu($event, item)">
      {{ item.title }}
      <i-carbon:close-outline v-if="!item.affix" class="router-tab__icon" @click.stop="tagStore.closeTag(item.path)" />
    </n-tab>
  </n-tabs>
  <n-dropdown
    placement="bottom-start"
    v-bind="bindDrop"
  />
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
