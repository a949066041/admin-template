import { setRequest } from '@yy-web/request'
import type { AsyncRouters } from '@yy-admin/common-core'
import { YyDict, authRoute, requestInstance, withSrcViewModules } from '@yy-admin/common-core'
import { confBusiness } from '@yy-web/business-use'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import { confNaive } from '@yy-admin/components-naive'
import { h } from 'vue'
import Layout from './components/layout/index.vue'
import { useAppConfigStore } from './components/app-config/config'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
export function setupAdmin(app: App, router: Router, page: AsyncRouters) {
  const { message, dialog } = useAppConfigStore()
  // base
  app.use(createPinia())
  app.use(router)
  setRequest(requestInstance)

  window.errorMsg = message.error

  // business config
  confBusiness(app, {
    resetType: null,
    successTip: (msg: string) => message.success(msg),
    table: {
      pageKey: 'page',
      totalKey: 'totalElements',
      listKey: 'content',
      pageOffset: 1,
    },
    async confirmTip(content: string, callback, cancelFn) {
      const d = dialog.create({
        title: '提示',
        content,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick() {
          d.loading = true
          return new Promise<void>((resolve) => {
            callback().then(() => {
              d.loading = false
              resolve()
            })
          })
        },
        onNegativeClick() {
          typeof cancelFn === 'function' && cancelFn()
        },
      })
    },
  })

  // naive config
  confNaive(app, {
    dict(dict, value) {
      return h(YyDict, { dict }, { default: ({ flatData }: { flatData: Record<string, string> }) => flatData[`${value}`] })
    },
  })

  // add router
  authRoute(router, ['/login'], {
    ...withSrcViewModules(page),
    Layout,
  })
}
