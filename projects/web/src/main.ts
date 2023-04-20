import { createApp } from 'vue'
import { createPinia } from 'pinia'
import YyUI from '@yy-admin/common-components'
import { setRequest } from '@yy-web/request'
import { confBusiness } from '@yy-web/business-use'
import { authRoute, requestInstance } from '@yy-admin/common-core'
import App from './App.vue'
import router from './router'

import 'uno.css'
import 'virtual:unocss-devtools'

const app = createApp(App)

setRequest(requestInstance)

app.use(YyUI)
app.use(createPinia())
app.use(router)
confBusiness(app, {
  table: {
    pageKey: 'page',
    totalKey: 'totalElements',
    listKey: 'content',
    pageOffset: 1,
  },
})
authRoute(router, ['/login'])

app.mount('#app')
