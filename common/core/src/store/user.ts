import { ref } from 'vue-demi'
import { defineStore } from 'pinia'
import { AuthApi, MenuApi } from '@yy-admin/apis'
import type { LoginForm, MenuList, UserInfo } from '@yy-admin/apis'
import { clearToken, setToken } from '../utils/token'

export const useUserStore = defineStore('core-user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const userMenuList = ref<MenuList[]>([])

  async function loginAction(loginForm: LoginForm) {
    const { token } = await AuthApi.login(loginForm)
    setToken(token)
  }

  async function getUserInfo() {
    const user = await AuthApi.info()
    const menuList = await MenuApi.buildMenu()
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
