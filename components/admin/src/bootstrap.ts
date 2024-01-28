import { setRequest } from '@yy-web/request'
import BaseUI from '@yy-admin/components-base'
import type { AsyncRouters } from '@yy-admin/common-core'
import { $pinia, YyDict, authRoute, requestInstance, withSrcViewModules } from '@yy-admin/common-core'
import { confBusiness } from '@yy-web/business-use'
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import dayjs from 'dayjs'
import { confNaive } from '@yy-admin/components-naive'
import { h } from 'vue'
import Layout from './components/layout/index.vue'
import { useAppConfigStore } from './components/app-config/config'
import 'dayjs/locale/zh-cn'
import { createYyRouter, loginRoute } from './router'

dayjs.locale('zh-cn')

export function setupComponents(app: App) {
  const { message, dialog } = useAppConfigStore()

  window.errorMsg = message.error
  setRequest(requestInstance)
  // base
  app.use($pinia)
  app.use(BaseUI)

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
}

export function setupAdmin(app: App, page: AsyncRouters, home?: RouteRecordRaw) {
  const router = createYyRouter(home)
  app.use(router)
  setupComponents(app)
  // add router
  authRoute(router, ['/login'], {
    ...withSrcViewModules(page),
    Layout,
  })

  router.addRoute(loginRoute)
}
