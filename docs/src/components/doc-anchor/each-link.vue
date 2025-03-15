<script lang="ts" setup>
import type { ITreeTocList } from '../../composables'

defineOptions({
  name: 'EachLink',
})

const props = defineProps<{ render: ITreeTocList }>()

function handleToScroll() {
  props.render.element.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <n-anchor-link :key="render.title" :title="render.title" @click="handleToScroll">
    <template v-if="render.children!.length > 0" #default>
      <EachLink v-for="item in render.children" :key="item.title" :render="item" />
    </template>
  </n-anchor-link>
</template>
