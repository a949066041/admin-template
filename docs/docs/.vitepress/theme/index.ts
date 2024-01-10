// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'

import 'uno.css'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

import YyDemo from '../../../../config/md-vue/src/demo/yy-demo.vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('YyDemo', YyDemo)

    app.use(VueMonacoEditorPlugin, {
      paths: {
        // The recommended CDN config
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
      },
    })
  },
}
