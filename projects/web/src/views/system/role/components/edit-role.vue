<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{ open: boolean }>()

const visible = useVModel(props, 'open')

defineOptions({
  name: 'EditRole',
})
</script>

<template>
  <a-modal v-model:open="visible" title="hello">
    EditRole
  </a-modal>
</template>
