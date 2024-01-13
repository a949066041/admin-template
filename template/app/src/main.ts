import { createApp } from 'vue'
import '@yy-admin/common-css'
import 'uno.css'

import { setupAdmin } from '@yy-admin/components-admin'
import { pageList } from './page'
import App from './App.vue'

const app = createApp(App)

setupAdmin(app, pageList())

app.mount('#app')
