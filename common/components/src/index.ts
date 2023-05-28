import type { App } from 'vue-demi'
import YySelect from './components/Select/index.vue'
import YySearch from './components/Search/index.vue'

export default function install(app: App) {
  app.component(YySelect.name, YySelect)
  app.component(YySearch.name, YySearch)
  return app
}
