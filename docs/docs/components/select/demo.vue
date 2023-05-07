<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)

function handleChangeValue(selectValue: string) {
  console.log(selectValue, value.value)
}
</script>

<template>
  currentValue: {{ value }}
  <section>
    <yy-select
      v-model:value.number="value"
      placeholder="请选择"
      class="!min-w-300px" :list="{ 1: 'test', 2: 'test2' }"
      @change="handleChangeValue"
    />
  </section>
  <section>
    <yy-select
      v-model:value.number="value"
      placeholder="请选择"
      class="!min-w-300px"
      :list="[{ id: 1, name: 'test' }, { id: 2, name: 'test2' }]"
      @change="handleChangeValue"
    />
  </section>
</template>
