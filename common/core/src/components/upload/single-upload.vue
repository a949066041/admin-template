<script lang="ts" setup>
import type { IPropsUpload } from './index'

defineOptions({
  name: 'SingleUpload',
})

withDefaults(defineProps<IPropsUpload>(), {
  name: 'file',
  size: 2,
  ext: () => ['jpg', 'jpeg', 'png'],
})
</script>

<template>
  <div>SingleUpload</div>
</template>
