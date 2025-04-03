import type { IMenuBuild, LoginForm, UserInfo } from '@yy-admin/common-apis'
import type { Router } from 'vue-router'
import { createGlobalState } from '@vueuse/core'
import { AuthApi, MenuApi } from '@yy-admin/common-apis'
import { encrypt } from '@yy-admin/common-utils'
import { computed, ref } from 'vue'
import { flatChildrenArr, tokenStorage } from '../utils'

export const useUserStore = createGlobalState(() => {
  const userInfo = ref<UserInfo | null>(null)
  const userMenuList = ref<IMenuBuild[]>([])
  const flatMenuList = computed(() => flatChildrenArr(userMenuList.value))
  const userValue = computed(() => {
    if (!userInfo.value)
      return null

    return userInfo.value.user
  })

  const isLogin = computed(() => userValue.value !== null)
  let currentRouter: Router | null = null

  const avatar = computed(() => {
    if (!userInfo.value)
      return ''

    return `/avatar/${userInfo.value.user.avatarName}`
  })

  async function loginAction(loginForm: LoginForm) {
    const { token } = await AuthApi.login({ ...loginForm, password: encrypt(loginForm.password) as string })
    tokenStorage.setValue(token)
  }

  async function getUserInfo(refreshUser: boolean = false) {
    const user = await AuthApi.info()
    setUserInfo(user)
    if (refreshUser)
      return
    const menuList = await MenuApi.buildMenu()
    return menuList
  }

  function setUserInfo(user: UserInfo) {
    userInfo.value = user
  }

  function setRenderMenuList(realMenu: IMenuBuild[], router: Router) {
    userMenuList.value = realMenu
    currentRouter = router
  }

  async function logout() {
    return new Promise<void>((resolve, reject) => {
      AuthApi.logout().then(() => {
        userInfo.value = null
        // remove currentRoute
        if (currentRouter) {
          userMenuList.value.forEach((item) => {
            currentRouter!.removeRoute(item.name)
          })
        }
        userMenuList.value = []
        tokenStorage.removeValue()
        resolve()
      }).catch(reject)
    })
  }

  return {
    isLogin,
    userValue,
    avatar,
    flatMenuList,
    userMenuList,
    userInfo,
    setRenderMenuList,
    logout,
    loginAction,
    getUserInfo,
  }
})
