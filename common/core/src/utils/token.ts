import Cookies from 'js-cookie'

const tokenKey = 'yy-web'
export function setToken(token: string) {
  Cookies.set(tokenKey, token)
}

export function getToken() {
  return Cookies.get(tokenKey) || undefined
}

export function clearToken() {
  Cookies.remove(tokenKey)
}
