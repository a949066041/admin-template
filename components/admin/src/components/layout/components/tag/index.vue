<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { NTag } from 'naive-ui'
import ScrollContent from '../../../scroll-content/index.vue'
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

function handleChangeTag(path: string) {
  tagStore.activeTag = path
}

onMounted(() => {
  handleAddTag(route)
})

router.afterEach(handleAddTag)
</script>

<template>
  <ScrollContent class="pb-2">
    <NTag
      v-for="item of tagStore.tagList"
      :key="item.path"
      :type="tagStore.activeTag === item.path ? 'success' : undefined" class=" cursor-pointer router-tab flex items-center mr-3 last:mr-0"
      @contextmenu="handleOpenMenu($event, item)"
      @click="handleChangeTag(item.path)"
    >
      <div class=" flex items-center">
        <span>{{ item.title }}</span>
        <i-carbon:close-outline v-if="!item.affix" class="router-tab__icon text-0 cursor-pointer ml-2 transition-all duration-.3s " @click.stop="tagStore.closeTag(item.path)" />
      </div>
    </NTag>
    <n-dropdown
      placement="bottom-start"
      v-bind="bindDrop"
    />
  </ScrollContent>
</template>

<style scoped lang="less">
.router-tab {
  &:hover {
    .router-tab__icon {
      @apply w-3 h-3;
    }
  }
}
</style>
