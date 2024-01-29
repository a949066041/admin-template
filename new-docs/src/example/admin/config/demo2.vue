<script lang="ts" setup>
import { AppConfig, useAppConfigStore } from '@yy-admin/components-admin'

const { message, dialog, notification, loadingBar } = useAppConfigStore()
</script>

<template>
  <AppConfig>
    <div>
      <n-space>
        <n-button type="primary" @click="message.success('ok')">
          success ok
        </n-button>
        <n-button type="primary" @click="dialog.success({ title: 'ok' })">
          dialog
        </n-button>
        <n-button type="primary" @click="notification.success({ title: 'notification' })">
          notification
        </n-button>
      </n-space>
      <n-space>
        <n-button class="mt-2" type="primary" @click="loadingBar.start()">
          loadingBar start
        </n-button>
        <n-button class="mt-2" type="primary" @click="loadingBar.finish()">
          loadingBar end
        </n-button>
      </n-space>
    </div>
  </AppConfig>
</template>
