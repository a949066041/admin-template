import { ref } from 'vue-demi'
import { defineStore } from 'pinia'
import { setToken } from '../utils/token'
import { info, login } from '../api/login'
import type { LoginForm, UserInfo } from '../api/login.type'

export const useUserStore = defineStore('core-user', () => {
  const userInfo = ref<UserInfo | null>(null)

  async function loginAction(loginForm: LoginForm) {
    const { token, user } = await login(loginForm)
    setToken(token)
    setUserInfo(user)
  }

  async function getUserInfo() {
    const user = await info()
    setUserInfo(user)
  }

  function setUserInfo(user: UserInfo) {
    userInfo.value = user
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
