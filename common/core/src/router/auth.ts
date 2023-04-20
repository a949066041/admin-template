import type { Router } from 'vue-router'
import { useUserStore } from '../store/user'
import { getToken } from '../utils/token'

export function authRoute(router: Router, whiteList?: string[]) {
  router.beforeEach(async (to, _from, next) => {
    const user = getToken()
    if (user) {
      const userStore = useUserStore()
      const userInfo = userStore.userInfo
      if (userInfo) {
        next()
        return
      }
      await userStore.getUserInfo()
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
