<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useCurrentElement, useElementSize, useToggle } from '@vueuse/core'
import { NScrollbar } from 'naive-ui'

defineOptions({
  name: 'ScrollContent',
})

const el = useCurrentElement<HTMLElement>()
const scrollX = ref<InstanceType<typeof NScrollbar>>()
const contentScroll = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(contentScroll)
const [xAction, toggleXAction] = useToggle()
const [yAction, toggleYAction] = useToggle()

watch([width, height], ([currentWidth, currentHeight]) => {
  const parentEl = el.value.nextSibling as HTMLElement
  if (parentEl) {
    toggleXAction(parentEl.clientWidth < currentWidth)
    toggleYAction(parentEl.clientHeight < currentHeight)
  }
})

function handleToLeft() {
  scrollX.value?.scrollTo({ left: 0, behavior: 'smooth' })
}

function handleChange(block: MouseEvent) {
  scrollX.value?.scrollTo({ left: block.clientX, behavior: 'smooth' })
}

function handleToRight() {
  scrollX.value?.scrollTo({ left: width.value, behavior: 'smooth' })
}
</script>

<template>
  <div class=" mx-2 relative" :class="[xAction && '!mx-8', yAction && '!my-8']">
    <template v-if="xAction">
      <i-mingcute:left-fill class=" absolute left-[-20px] z-10 top-[5px] text-sm cursor-pointer" @click="handleToLeft" />
      <i-mingcute:right-fill class=" absolute right-[-20px] z-10 top-[5px] text-sm cursor-pointer" @click="handleToRight" />
    </template>
    <NScrollbar ref="scrollX" x-scrollable>
      <div ref="contentScroll" class=" flex flex-nowrap pb-2" @click="handleChange">
        <slot v-bind="{ xAction, yAction }" />
      </div>
    </NScrollbar>
  </div>
</template>
