<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'

const { logout } = useUserStore()
</script>

<template>
  <n-button type="primary" @click="logout">
    退出
  </n-button>
</template>
