<script lang="ts" setup>
import { codeToHtml } from 'shiki'
import { createTwoslasher } from 'twoslash-vue'
import { createTransformerFactory, rendererRich } from '@shikijs/twoslash'

const props = defineProps<{
  example: string
}>()
const res = await import(
  `../examples/${props.example}/demo.vue?raw`
)
const code = res.default

const html = await codeToHtml(code, {
  theme: 'github-light',
  lang: 'vue',
  transformers: [
    createTransformerFactory(createTwoslasher())({
      langs: ['vue'],
      renderer: rendererRich(),
    }),
  ],
})
</script>

<template>
  <div>
    <div v-html="html" />
  </div>
</template>
