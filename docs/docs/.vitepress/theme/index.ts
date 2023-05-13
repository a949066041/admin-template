// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import Antd from 'ant-design-vue'
import YyUI from '@yy-admin/common-components'
import 'uno.css'
import 'virtual:unocss-devtools'
import DemoBlock from '@ruabick/vitepress-demo-block'
import '@ruabick/vitepress-demo-block/dist/style.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('Demo', DemoBlock)
    app.use(Antd)
    app.use(YyUI)
  },
}
