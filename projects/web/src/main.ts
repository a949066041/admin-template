import { createApp } from 'vue'
import { createPinia } from 'pinia'
import YyUI from '@yy-admin/common-components'
import BaseUI from '@yy-admin/base-components'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { Layout } from '@yy-admin/common-admin'
import { setRequest } from '@yy-web/request'
import { confBusiness } from '@yy-web/business-use'
import { authRoute, requestInstance, withSrcViewModules } from '@yy-admin/common-core'
import App from './App.vue'
import router from './router'

import 'uno.css'
import 'virtual:unocss-devtools'

const app = createApp(App)
setRequest(requestInstance)

app.use(YyUI)
app.use(BaseUI)
app.use(createPinia())
app.use(router)
app.use(Antd)
confBusiness(app, {
  table: {
    pageKey: 'page',
    totalKey: 'totalElements',
    listKey: 'content',
    pageOffset: 1,
  },
})
authRoute(router, ['/login'], {
  ...withSrcViewModules(import.meta.glob('@/views/**/*.vue')),
  Layout,
})

app.mount('#app')
