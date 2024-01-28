import { fileInterceptorsResponseConfig } from '@yy-web/request'
import { useUserStore } from '../store'

export function responseInterceptors(response: any) {
  const { isFile, value } = fileInterceptorsResponseConfig(response)
  if (isFile)
    return value

  return response.data
}

export function responseInterceptorsError(error: any) {
  if (error.response) {
    const useStore = useUserStore()
    switch (error.response.status) {
      case 401:
        useStore.logout().then(() => {
          window.errorMsg('退出成功')
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        })
        break
      default: {
        const errorMsg = error.response.data.message
        window.errorMsg(errorMsg)
      }
    }
  }
  return Promise.reject(error)
}
