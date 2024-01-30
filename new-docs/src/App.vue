<script lang="ts" setup>
import { AppConfig } from '@yy-admin/components-admin'
import { DocRouter, LoginStatus } from './components'

defineOptions({
  name: 'App',
})
</script>

<template>
  <AppConfig>
    <div class=" flex h-screen overflow-hidden">
      <DocRouter />
      <div class="flex flex-col overflow-hidden flex-1 overflow-hidden h-full">
        <LoginStatus />
        <div class="flex-1 overflow-auto px-5">
          <router-view />
        </div>
      </div>
    </div>
  </AppConfig>
</template>
