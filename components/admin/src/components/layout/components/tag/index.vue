<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { NTag } from 'naive-ui'
import { useCurrentElement } from '@vueuse/core'
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

const currentEl = useCurrentElement<HTMLElement>()
const scrollContent = ref<InstanceType<typeof ScrollContent>>()
const route = useRoute()
const router = useRouter()
watch(() => tagStore.activeTag, (tag) => {
  if (tag)
    router.push(tag)
  handleScrollTag()
})

function handleScrollTag() {
  // https://github.com/qingqingxuan/admin-work/blob/master/src/components/tabbar/index.vue
  nextTick(() => {
    const el = currentEl.value.querySelector(`[data-path="${route.path}"]`) as HTMLElement
    el && scrollContent.value?.handleToX(el.offsetLeft)
  })
}

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
  <div
    class="shadow-[0_1px_3px_0_rgba(0,0,0,.12),0_0_3px_0_rgba(0,0,0,.04)] dark:shadow-[0_1px_3px_0_rgba(255,255,255,.12),0_0_3px_0_rgba(255,255,255,.04)] border-t border-t-solid dark:border-color-[rgba(255,255,255,0.09)]
    border-color-[rgb(239,239,245)] pt-2"
  >
    <ScrollContent ref="scrollContent">
      <NTag
        v-for="item of tagStore.tagList"
        :key="item.path"
        :data-path="item.path"
        :type="tagStore.activeTag === item.path ? 'success' : undefined" class=" cursor-pointer router-tab flex items-center mr-3 last:mr-0"
        @contextmenu="handleOpenMenu($event, item)"
        @click="handleChangeTag(item.path)"
      >
        <div class=" flex items-center">
          <span>{{ item.title }}</span>
          <i v-if="!item.affix" class="router-tab__icon text-0 cursor-pointer ml-2 transition-all duration-.3s i-carbon:close-outline" @click.stop="tagStore.closeTag(item.path)" />
        </div>
      </NTag>
      <n-dropdown
        placement="bottom-start"
        v-bind="bindDrop"
      />
    </ScrollContent>
  </div>
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
