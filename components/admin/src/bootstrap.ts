import { setRequest } from '@yy-web/request'
import type { AsyncRouters } from '@yy-admin/common-core'
import { authRoute, requestInstance, withSrcViewModules } from '@yy-admin/common-core'
import { confBusiness } from '@yy-web/business-use'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createPinia } from 'pinia'
import { Confirm, Contextmenu, Loading, Message, Notice, Toast } from 'vexip-ui'
import Layout from './components/layout/index.vue'
import 'vexip-ui/css/dark/index.css'

export function setupAdmin(app: App, router: Router, page: AsyncRouters) {
  app.use(createPinia())
  app.use(router)
  app.use(Confirm)
    .use(Contextmenu)
    .use(Loading)
    .use(Message)
    .use(Notice)
    .use(Toast)
  setRequest(requestInstance)
  confBusiness(app, {
    successTip: (msg: string) => Message.success(msg),
    table: {
      pageKey: 'page',
      totalKey: 'totalElements',
      listKey: 'content',
      pageOffset: 1,
    },
    async confirmTip(content: string, callback, cancelFn) {
      const isConfirm = await Confirm.open(content)
      if (isConfirm) {
        callback()
        return
      }
      typeof cancelFn === 'function' && cancelFn()
    },
  })

  authRoute(router, ['/login'], {
    ...withSrcViewModules(page),
    Layout,
  })
}
