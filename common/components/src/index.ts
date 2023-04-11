import type { App } from 'vue-demi'
import { default as YySelect } from './components/Select/index.vue'

export default function install(app: App) {
  app.component(YySelect.name, YySelect)
  return app
}
