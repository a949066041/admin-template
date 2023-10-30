// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import Antd from 'ant-design-vue'

import { YySelect } from '@yy-admin/common-components'
import 'uno.css'

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
    app.use(Antd)
    app.component(YySelect.name, YySelect)
  },
}
