<script lang="ts" setup>
import { AppConfig } from '@yy-admin/components-admin'
import { DocRouter, LoginStatus } from './components'

defineOptions({
  name: 'App',
})
</script>

<template>
  <AppConfig>
    <div class=" flex">
      <DocRouter />
      <div class="flex flex-col overflow-hidden flex-1">
        <LoginStatus />
        <div class="flex-1">
          <router-view />
        </div>
      </div>
    </div>
  </AppConfig>
</template>
