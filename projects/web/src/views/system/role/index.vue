<script lang="ts" setup>
import { computed } from 'vue'
import { useCounter2 } from './useCounter2'

const value = computed(() => {
  return 1
})
// const { value } = useCounter()
const { value: value2 } = useCounter2(value)
</script>

<script lang="ts">
export default {
  name: 'Role',
}
</script>

<template>
  <div>
    {{ value }}
    {{ value2 }}
  </div>
</template>
