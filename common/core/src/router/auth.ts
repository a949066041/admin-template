import type { Router } from 'vue-router'
import { useUserStore } from '../store/user'
import { getToken } from '../utils/token'
import { type AsyncRouters, addWebRouter } from '../utils/registerRouter'

const isLoginPage = (path: string) => path.includes('/login')

export function authRoute(router: Router, whiteList?: string[], mathRules?: AsyncRouters) {
  router.beforeEach(async (to, _from, next) => {
    const userToken = getToken()
    if (userToken) {
      const loginPage = isLoginPage(to.path)
      if (loginPage) {
        next('/')
        return
      }
      const userStore = useUserStore()
      const userInfo = userStore.userInfo
      if (userInfo) {
        next()
        return
      }
      const menuList = await userStore.getUserInfo()
      userStore.setRenderMenuList(addWebRouter(router, menuList, mathRules))
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
