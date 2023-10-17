<script lang="ts" setup>
import { AppConfig } from '@yy-admin/common-admin'

defineOptions({
  name: 'App',
})
</script>

<template>
  <AppConfig title="web1">
    <RouterView />
  </AppConfig>
</template>
