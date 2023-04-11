<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

export interface Props {
  value?: string | number | (string | number)[]
  ofKey?: string
  ofValue?: string
  list?: any[] | { [k: string]: string }
}

const props = withDefaults(defineProps<Props>(), {
  ofKey: 'id',
  ofValue: 'name',
  list: () => ([]),
})

const bindValue = useVModel(props, 'value')
const withList = computed(() => {
  const { ofKey, ofValue } = props
  if (Array.isArray(props.list)) {
    return props.list.map(item => ({
      [ofKey]: item[ofKey],
      [ofValue]: item[ofValue],
    }))
  }
  return Object.entries(props.list).map(([k, v]) => ({
    [ofKey]: k,
    [ofValue]: v,
  }))
})
</script>

<script lang="ts">
export default {
  name: 'YySelect',
}
</script>

<template>
  <a-select v-model:value="bindValue" v-bind="$attrs" min-w-100px>
    <a-select-option
      v-for="item of withList" :key="item[ofKey]" :value="item[ofKey]" :title="item[ofValue]"
    >
      {{ item[ofValue] }}
    </a-select-option>
  </a-select>
</template>
