<script lang="ts" setup>
import { SingleUpload } from '@yy-admin/common-core'
import { LocalStorageApi } from '@yy-admin/common-apis'

defineOptions({
  name: 'Upload',
})
</script>

<template>
  <div>
    <SingleUpload :action="LocalStorageApi.upload" />
  </div>
</template>
