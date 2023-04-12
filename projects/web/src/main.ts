import { createApp } from 'vue'
import { createPinia } from 'pinia'
import YyUI from '@yy-admin/common-components'
import { setRequest } from '@yy-web/request'
import { requestInstance } from '@yy-admin/common-core'
import App from './App.vue'
import router from './router'

import 'uno.css'
import 'virtual:unocss-devtools'

const app = createApp(App)

setRequest(requestInstance)

app.use(YyUI)
app.use(createPinia())
app.use(router)

app.mount('#app')
