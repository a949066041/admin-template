import { createApp } from 'vue'
import '@yy-admin/common-css'
import 'uno.css'

import { setupAdmin } from '@yy-admin/components-admin'
import App from './App.vue'
import router from './router'
import { setupApp } from './setup'

const app = createApp(App)

setupApp(app)
setupAdmin(app, router, import.meta.glob('@/views/**/*.vue'))

app.mount('#app')
