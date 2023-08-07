<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'EditRole',
})

const props = defineProps<{ open: boolean }>()

const visible = useVModel(props, 'open')
</script>

<template>
  <a-modal v-model:open="visible" title="hello">
    EditRole
  </a-modal>
</template>
