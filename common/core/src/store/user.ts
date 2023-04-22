import { ref } from 'vue-demi'
import { defineStore } from 'pinia'
import { setToken } from '../utils/token'
import { buildMenu, info, login } from '../api/login'
import type { LoginForm, MenuList, UserInfo } from '../api/login.type'

export const useUserStore = defineStore('core-user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const userMenuList = ref<MenuList[]>([])

  async function loginAction(loginForm: LoginForm) {
    const { token } = await login(loginForm)
    setToken(token)
  }

  async function getUserInfo() {
    const user = await info()
    const menuList = await buildMenu()
    setUserInfo(user, menuList)
  }

  function setUserInfo(user: UserInfo, userMenu: MenuList[]) {
    userInfo.value = user
    userMenuList.value = userMenu
  }

  async function logout() {
    userInfo.value = null
  }

  return {
    userInfo,
    logout,
    loginAction,
    getUserInfo,
  }
})
