import { ref } from 'vue-demi'
import { defineStore } from 'pinia'
import { clearToken, setToken } from '../utils/token'
import { buildMenu, info, login, logout as logoutAction } from '../api/login'
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
    setUserInfo(user)
    return menuList
  }

  function setUserInfo(user: UserInfo) {
    userInfo.value = user
  }

  function setRenderMenuList(realMenu: MenuList[]) {
    userMenuList.value = realMenu
  }

  async function logout() {
    await logoutAction()
    userInfo.value = null
    clearToken()
  }

  return {
    userMenuList,
    userInfo,
    setRenderMenuList,
    logout,
    loginAction,
    getUserInfo,
  }
})
