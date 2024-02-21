<script lang="ts" setup>
import type { ITreeTocList } from '../../composables'
import EachLink from './each-link.vue'

defineOptions({
  name: 'DocAnchor',
})

defineProps<{ headers: ITreeTocList[] }>()
</script>

<template>
  <n-anchor
    affix
    :trigger-top="24"
    :top="88"
    style="z-index: 1"
    ignore-gap
  >
    <EachLink v-for="item of headers" :key="item.title" :render="item" />
  </n-anchor>
</template>
