import { createApp } from 'vue'
import { createPinia } from 'pinia'
import YyUI from '@yy-admin/common-components'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'uno.css'
import 'virtual:unocss-devtools'

const app = createApp(App)

app.use(YyUI)
app.use(createPinia())
app.use(router)

app.mount('#app')
