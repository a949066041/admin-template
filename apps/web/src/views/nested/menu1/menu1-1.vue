<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ msg: number }>()
</script>

<template>
  <DefineTemplate v-slot="{ msg }">
    this.is{{ msg }}
    <!-- something complex -->
  </DefineTemplate>

  <div>
    <ReuseTemplate :msg="123" />
  </div>
  <div>
    <ReuseTemplate :msg="234" />
  </div>
</template>
