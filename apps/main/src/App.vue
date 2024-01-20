<script lang="ts" setup>
import { AppConfig } from '@yy-admin/components-admin'

defineOptions({
  name: 'App',
})
</script>

<template>
  <AppConfig title="web1">
    <RouterView />
  </AppConfig>
</template>
