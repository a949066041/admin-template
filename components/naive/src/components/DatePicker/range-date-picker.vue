<script lang="ts" setup>
import type { DatePickerProps } from 'naive-ui'
import { first } from 'lodash-es'
import { NDatePicker } from 'naive-ui'
import { computed } from 'vue'
import { AUTO_COMPLETE_END, AUTO_COMPLETE_START, DATE_FORMAT, NOW_DAY, SHORTCUTS } from './date.utils'

defineOptions({
  name: 'YyRangeDatePicker',
})

const props = withDefaults(defineProps<IYyRangeDatePickerProps>(), {
  value: '',
  start: '',
  end: '',
  type: 'date',
  range: () => ['', ''],
  mergeRange: false,
})

const emits = defineEmits<{
  'update:value': [val: string]
  'update:start': [val: string]
  'update:end': [val: string]
  'update:range': [range: [string, string]]
}>()

interface IYyRangeDatePickerProps {
  value?: string | null
  start?: string | null
  end?: string | null
  range?: [string, string] | null
  type?: DatePickerProps['type']
  mergeRange?: boolean
}

const isRange = computed(() => props.type.includes('range'))
const isRangeDate = computed(() => {
  return isRange.value && props.type === 'daterange'
})

const bindDateValue = computed<string | [string, string]>({
  get() {
    if (isRange.value) {
      const withValue: [string, string] | null = props.mergeRange
        ? first(props.range)
          ? props.range!
          : null
        : props.start
          ? [props.start!, props.end!]
          : null
      return (withValue !== null
        ? withValue
            .map(item => item.replace(AUTO_COMPLETE_START, '').replace(AUTO_COMPLETE_END, ''))
        : null) as [string, string]
    }
    return (props.value || null) as string
  },
  set(val: [string, string] | string) {
    if (isRange.value && Array.isArray(val)) {
      const rangeDate = isRangeDate.value
      const [start, end] = val
      const startValue = `${start}${rangeDate ? AUTO_COMPLETE_START : ''}`
      const endValue = `${end}${rangeDate ? AUTO_COMPLETE_END : ''}`
      emits('update:start', startValue)
      emits('update:end', endValue)
      emits('update:range', [startValue, endValue] as [string, string])
      return
    }
    emits('update:value', val as string)
  },
})

const shortcuts = computed<DatePickerProps['shortcuts']>(() => {
  const baseShortcuts = {
    今天: SHORTCUTS.today,
    昨天: SHORTCUTS.yesterday,
    本周: SHORTCUTS.thisWeek,
    本月: SHORTCUTS.thisMonth,
    今年: SHORTCUTS.thisYear,
    去年: SHORTCUTS.lastYear,
  }

  if (isRange.value) {
    return Object.entries(baseShortcuts).reduce((acc, [key, value]) => {
      acc[key] = [value, NOW_DAY]
      return acc
    }, {} as Required<DatePickerProps>['shortcuts'])
  }

  return baseShortcuts
})
</script>

<template>
  <NDatePicker
    v-bind="$attrs"
    v-model:formatted-value="bindDateValue"
    :type="type"
    :value-format="DATE_FORMAT[type!]"
    :format="DATE_FORMAT[type!]"
    :shortcuts="shortcuts"
    clearable
  />
</template>
