import { setRequest } from '@yy-web/request'
import type { AsyncRouters } from '@yy-admin/common-core'
import { authRoute, requestInstance, withSrcViewModules } from '@yy-admin/common-core'
import { confBusiness } from '@yy-web/business-use'
import { Modal } from 'ant-design-vue'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createPinia } from 'pinia'
import Layout from './components/layout/index.vue'

export function setupAdmin(app: App, router: Router, page: AsyncRouters) {
  app.use(createPinia())
  app.use(router)
  setRequest(requestInstance)

  confBusiness(app, {
    table: {
      pageKey: 'page',
      totalKey: 'totalElements',
      listKey: 'content',
      pageOffset: 1,
    },
    confirmTip(content: string, callback, cancelFn) {
      Modal.confirm({
        title: '提示',
        content,
        okText: '确定',
        cancelText: '取消',
        async onOk() {
          try {
            await callback()
          }
          catch (error) {
            return Promise.reject(error)
          }
        },
        onCancel() {
          typeof cancelFn === 'function' && cancelFn()
        },
      })
    },
  })

  authRoute(router, ['/login'], {
    ...withSrcViewModules(page),
    Layout,
  })
}
