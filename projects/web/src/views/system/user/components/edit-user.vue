<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{ open: boolean }>()

const visible = useVModel(props, 'open')

defineOptions({
  name: 'EditUser',
})
</script>

<template>
  <a-modal v-model:open="visible" title="hello">
    EditUser
  </a-modal>
</template>
