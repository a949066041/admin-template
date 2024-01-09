<script lang="ts" setup generic="T extends object">
import { useFileDialog, useVModel } from '@vueuse/core'
import { first } from 'lodash-es'

defineOptions({
  name: 'BaseUpload',
})

const props = defineProps<{ action: (file: File, cb?: (progress: number) => void) => Promise<T>, progress?: number }>()

const emits = defineEmits<{
  'update:progress': [progress: number]
  'success': [res: T]
}>()
const progress = useVModel(props, 'progress')
const { open, reset, onChange } = useFileDialog({
  accept: 'image/*',
  directory: false,
  multiple: false,
})

onChange((files) => {
  if (files) {
    const file = first(files)
    if (file) {
      props.action(file, (value) => {
        progress.value = value
        emits('update:progress', value)
      }).then((res) => {
        emits('success', res)
      })
    }
  }
})

const context = {
  open,
  reset,
  progress,
}
</script>

<template>
  <div>
    <slot v-bind="context" />
  </div>
</template>
