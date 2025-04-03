import type { Router } from 'vue-router'
import type { AsyncRouters } from '../utils/registerRouter'
import { useUserStore } from '../store'
import { tokenStorage } from '../utils'
import { addWebRouter } from '../utils/registerRouter'

const isLoginPage = (path: string) => path.includes('/login')

export function authRoute(router: Router, whiteList?: string[], mathRules?: AsyncRouters) {
  router.beforeEach(async (to, _from, next) => {
    const userToken = tokenStorage.getValue()
    if (userToken) {
      const loginPage = isLoginPage(to.path)
      if (loginPage) {
        next('/')
        return
      }
      const { isLogin, getUserInfo, setRenderMenuList } = useUserStore()
      if (isLogin.value) {
        next()
        return
      }
      const menuList = await getUserInfo()
      // @ts-expect-error hii
      setRenderMenuList(addWebRouter(router, menuList || [], mathRules), router)
      next({ ...to, replace: true })
      return
    }
    if (whiteList && whiteList.includes(to.path)) {
      next()
      return
    }
    next('/login')
  })
}
