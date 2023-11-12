<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { initMonaco } from './monaco'

defineOptions({
  name: 'DemoEditor',
})

const props = withDefaults(defineProps<{ code: string }>(), {})
const emit = defineEmits(['change'])
const monacoContainer = ref<HTMLDivElement | null>(null)
let monacoInstance: any

onMounted(async () => {
  const monaco = await initMonaco()

  monacoInstance = monaco.editor.create(monacoContainer.value!, {
    automaticLayout: true,
    tabSize: 2,
    fixedOverflowWidgets: true,
    minimap: { enabled: false },
    lineNumbers: 'off',
    scrollbar: {
      handleMouseWheel: false,
    },
    fontSize: 14,
  })

  const codeModel = monaco.editor.createModel(
    props.code,
    'html',
    monaco.Uri.file(`${Math.random()}.html`), // Pass the file name to the model here.
  )

  monacoInstance.setModel(codeModel)

  // ---
  monacoInstance.onDidChangeModelContent(() => {
    const newValue = monacoInstance.getValue()
    emit('change', newValue)
  })

  // --- 防止浏览器滚动时,鼠标移动到编辑器上停止滚动,而去滚动编辑器的行为
  monacoInstance.onDidBlurEditorText(() => {
    monacoInstance.updateOptions({
      scrollbar: {
        handleMouseWheel: false,
      },
    })
  })
  monacoInstance.onDidFocusEditorText(() => {
    monacoInstance.updateOptions({
      scrollbar: {
        handleMouseWheel: true,
      },
    })
  })
})
</script>

<template>
  <div ref="monacoContainer" class="monaco h-[600px] w-[600px]" />
</template>
