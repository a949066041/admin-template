<script lang="ts" setup>
const props = defineProps<{
  example: string
}>()

let cmp: Component | false = false
try {
  const res = await import(`../examples/${props.example}/demo.vue`)
  cmp = res.default
}
catch {}
</script>

<template>
  <div>
    example
    <div class="demo-container">
      <component :is="cmp" v-if="cmp" />
    </div>
    <CodeExampleVue :example="example" />
  </div>
</template>
