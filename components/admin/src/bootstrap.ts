import type { AsyncRouters } from '@yy-admin/common-core'
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { authRoute, requestInstance, withSrcViewModules, YyDict } from '@yy-admin/common-core'
import BaseUI from '@yy-admin/components-base'
import { confNaive } from '@yy-admin/components-naive'
import { setRequest } from '@yy-web/request'
import { confBusiness } from '@yy-web/use-curd-vue'
import dayjs from 'dayjs'
import { h } from 'vue'
import { useAppConfigStore } from './components/app-config/config'
import Layout from './components/layout/index.vue'
import { createYyRouter, loginRoute } from './router'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export function setupComponents(app: App) {
  const { message, dialog } = useAppConfigStore()

  window.errorMsg = message.error
  setRequest(requestInstance)
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
  const { loadingBar } = useAppConfigStore()
  const router = createYyRouter(home)
  app.use(router)
  setupComponents(app)
  // add router
  authRoute(router, ['/login'], {
    ...withSrcViewModules(page),
    Layout,
  })

  router.addRoute(loginRoute)
  router.beforeEach(() => loadingBar.start())
  router.afterEach(() => loadingBar.finish())
}
