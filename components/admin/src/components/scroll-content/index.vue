<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useCurrentElement, useElementSize, useToggle } from '@vueuse/core'
import { NScrollbar } from 'naive-ui'

defineOptions({
  name: 'ScrollContent',
})

withDefaults(defineProps<{ contracts?: boolean }>(), {
  contracts: false,
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

function handleToX(x: number) {
  scrollX.value?.scrollTo({ left: x, behavior: 'smooth' })
}

function handleChange(block: MouseEvent) {
  handleToX(block.clientX)
}

defineExpose({
  handleToX,
})
</script>

<template>
  <div class=" mx-2 relative" :class="[xAction && '!mx-8', yAction && '!my-8']">
    <template v-if="xAction">
      <i-mingcute:left-fill class=" absolute left-[-20px] z-10 top-[5px] text-sm cursor-pointer" @click="handleToX(0)" />
      <i-mingcute:right-fill class=" absolute right-[-20px] z-10 top-[5px] text-sm cursor-pointer" @click="handleToX(width)" />
    </template>
    <NScrollbar ref="scrollX" x-scrollable>
      <div ref="contentScroll" class=" flex flex-nowrap pb-2" @click="contracts && handleChange">
        <slot v-bind="{ xAction, yAction }" />
      </div>
    </NScrollbar>
  </div>
</template>
