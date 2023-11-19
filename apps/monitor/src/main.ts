import { createApp } from 'vue'
import '@yy-admin/common-css'
import 'uno.css'

import { setupAdmin } from '@yy-admin/components-admin'
import App from './App.vue'
import router from './router'

const app = createApp(App)

setupAdmin(app, router, import.meta.glob('@/views/**/*.vue'))

app.mount('#app')
