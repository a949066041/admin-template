<script lang="ts" setup>
import { watchOnce } from '@vueuse/shared'
import { ref, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { useTag } from './useTag';

defineOptions({
  name: 'RouteTags',
})


const { tagList, closeTag, addTag, switchTag, activeTag, closeAll, closeRight } = useTag()

const route = useRoute()
const router = useRouter()
watch(activeTag, (tag) => {
  if (tag) {
    router.push(tag)
  }
})

watchOnce(() => route, () => {
  addTag({ path: route.path, title: route.meta.title as string, affix: !!route.meta.affix })
}, { immediate: true })

router.afterEach((to) => {
  addTag({ path: to.path, title: to.meta.title as string, affix:!!to.meta.affix })
})
</script>

<template>
    <a-tabs
      v-model:activeKey="activeTag" 
      type="card" class="!mb-0"
      @tab-click="switchTag"
    >
      <a-tab-pane v-for="item of tagList" :key="item.path">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <div class="router-tab flex items-center">
              <span>
                {{ item.title }}
              </span>
              <i-carbon:close-outline v-if="!item.affix" class="router-tab__icon" @click.stop="closeTag(item.path)" />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="closeAll">关闭全部</a-menu-item>
                <a-menu-item @click="closeRight(item.path)">关闭右侧</a-menu-item>
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
