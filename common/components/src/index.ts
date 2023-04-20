import type { App } from 'vue-demi'
import YySelect from './components/Select/index.vue'

export { default as YyLayout } from './components/Layout/index.vue'

export default function install(app: App) {
  app.component(YySelect.name, YySelect)
  return app
}
