<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
function handleAdd() {
  count.value++
}
</script>

<template>
  <div>
    {{ count }}
    <button @click="handleAdd()">
      add
    </button>
  </div>
</template>
