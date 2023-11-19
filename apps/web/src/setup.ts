import BaseUI from '@yy-admin/components-base'
import type { App } from 'vue'

export function setupApp(app: App) {
  app.use(BaseUI)
}
