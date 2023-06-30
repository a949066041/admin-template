<script lang="ts" setup>
import { AppConfig } from '@yy-admin/common-admin'
import { testRxjs } from '@yy-admin/common-utils'

testRxjs()

defineOptions({
  name: 'App',
})
</script>

<template>
  <AppConfig title="web1">
    <RouterView />
  </AppConfig>
</template>
