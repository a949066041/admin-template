import { createApp } from 'vue'
import '@yy-admin/common-css'

import { setupAdmin } from '@yy-admin/components-admin'
import { pageList } from '@yy-admin/web-monitor'
import App from './App.vue'
import router from './router'
import { setupApp } from './setup'

const app = createApp(App)

setupApp(app)
setupAdmin(app, router, { ...import.meta.glob('@/views/**/*.vue'), ...pageList() })

app.mount('#app')
