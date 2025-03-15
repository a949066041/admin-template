import { setupComponents } from '@yy-admin/components-admin'
import { createApp } from 'vue'
import App from './App.vue'

import { DemoBlock } from './components'
import router from './router'
import 'uno.css'

const app = createApp(App)
app.component('demo', DemoBlock)
app.use(router)
setupComponents(app)

router.isReady().then(() => {
  app.mount('#root')
})
