import { createApp } from 'vue'
import { setupComponents } from '@yy-admin/components-admin'

import App from './App.vue'
import 'uno.css'
import { DemoBlock } from './components'
import router from './router'

const app = createApp(App)
app.component('demo', DemoBlock)
app.use(router)
setupComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
