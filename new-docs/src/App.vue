<script lang="ts" setup>
import { AppConfig } from '@yy-admin/components-admin'
import { DocRouter } from './components'

defineOptions({
  name: 'App',
})
</script>

<template>
  <AppConfig>
    <div class=" flex">
      <DocRouter />
      <div class=" flex-1">
        <router-view />
      </div>
    </div>
  </AppConfig>
</template>
