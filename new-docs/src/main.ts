import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import Demo from './demo.vue'

const app = createApp(App)
app.component('demo', Demo)

app.mount('#app')
