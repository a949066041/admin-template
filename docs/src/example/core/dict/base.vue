<script setup lang="ts">
import { useDict } from '@yy-admin/common-core'
import { ref } from 'vue'

const currentDict = ref('user_status')
const dictLocalList = ['user_status', 'dept_status', 'job_status'].map(item => ({
  label: item,
  value: item,
}))

const currentTransform = ref<string>('string')
const transform = ['boolean', 'string', 'number'].map(item => ({
  label: item,
  value: item,
}))
const { loading, data, flatData } = useDict(currentDict, { transform: currentTransform })
</script>

<template>
  <div>
    当前选择字典：{{ currentDict }}
    <n-select v-model:value="currentDict" :options="dictLocalList" />
    当前选择字典：{{ currentTransform }}
    <n-select v-model:value="currentTransform" :options="transform" />
    <ul>
      <li>loading: {{ loading }}</li>
      <li>data: {{ data }}</li>
      <li>flatData: {{ flatData }}</li>
    </ul>
  </div>
</template>
