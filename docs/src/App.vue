<script lang="ts" setup>
import type { ITreeTocList } from './composables'
import { watchImmediate } from '@vueuse/core'
import { AppConfig } from '@yy-admin/components-admin'
import { nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { DocAnchor, DocRouter, LoginStatus } from './components'
import { getHeaders } from './composables'

defineOptions({
  name: 'App',
})
const route = useRoute()
const headers = ref<ITreeTocList[]>([])
watchImmediate(route, () => {
  nextTick(() => {
    headers.value = getHeaders()
  })
})
</script>

<template>
  <AppConfig>
    <div class=" flex h-screen overflow-hidden">
      <DocRouter />
      <div class="flex flex-col overflow-hidden flex-1 overflow-hidden h-full">
        <LoginStatus />
        <div class="flex-1 overflow-auto px-5">
          <n-row :gutter="12">
            <n-col :span="18">
              <router-view />
            </n-col>
            <n-col :span="6">
              <div class=" w-40 float-right p-10 overflow-hidden">
                <DocAnchor :headers="headers" />
              </div>
            </n-col>
          </n-row>
        </div>
      </div>
    </div>
  </AppConfig>
</template>
