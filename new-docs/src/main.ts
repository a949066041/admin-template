import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import { DemoBlock } from './components'
import router from './router'

const app = createApp(App)
app.component('demo', DemoBlock)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
