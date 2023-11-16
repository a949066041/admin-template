import { createApp } from 'vue'
import '@yy-admin/common-css'
import { createPinia } from 'pinia'
import BaseUI from '@yy-admin/components-base'
import { Modal } from 'ant-design-vue'
import { Layout } from '@yy-admin/components-admin'
import { setRequest } from '@yy-web/request'
import { confBusiness } from '@yy-web/business-use'
import { authRoute, requestInstance, withSrcViewModules } from '@yy-admin/common-core'
import App from './App.vue'
import router from './router'

import 'uno.css'

const app = createApp(App)
setRequest(requestInstance)

app.use(BaseUI)
app.use(createPinia())
app.use(router)
confBusiness(app, {
  table: {
    pageKey: 'page',
    totalKey: 'totalElements',
    listKey: 'content',
    pageOffset: 1,
  },
  confirmTip(content: string, callback, cancelFn) {
    Modal.confirm({
      title: '提示',
      content,
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        try {
          await callback()
        }
        catch (error) {
          return Promise.reject(error)
        }
      },
      onCancel() {
        typeof cancelFn === 'function' && cancelFn()
      },
    })
  },
})
authRoute(router, ['/login'], {
  ...withSrcViewModules(import.meta.glob('@/views/**/*.vue')),
  Layout,
})

app.mount('#app')
