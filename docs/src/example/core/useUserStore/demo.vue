<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'

const userStore = useUserStore()
</script>

<template>
  <n-button type="primary" @click="userStore.logout">
    退出
  </n-button>
</template>
