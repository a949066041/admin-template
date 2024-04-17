<script lang="ts" setup>
import { useFileUpload } from './useFileUpload'
import type { IPropsUpload } from './index'

defineOptions({
  name: 'SingleUpload',
})

const props = withDefaults(defineProps<IPropsUpload>(), {
  name: 'file',
  size: 2,
  ext: () => ['jpg', 'jpeg', 'png'],
})

const { handleUploadFile, fileListModel } = useFileUpload({
  value: [],
  name: props.name,
  size: props.size,
  action: props.action,
})
</script>

<template>
  <div>
    {{ fileListModel }}
    <button @click="handleUploadFile()">
      click
    </button>
  </div>
</template>
