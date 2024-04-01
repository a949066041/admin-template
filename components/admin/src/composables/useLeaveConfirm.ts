import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useAppConfigStore } from '../components/app-config/config'

export function useLeaveConfirm(message: MaybeRefOrGetter<string>, interruptFlag: MaybeRefOrGetter<boolean> = false) {
  const { dialog } = useAppConfigStore()

  function beforeAfterFn() {
    return new Promise<void>((resolve) => {
      dialog.create({
        title: '提示',
        content: toValue(message),
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick() {
          resolve()
        },
      })
    })
  }

  onBeforeRouteLeave((to, from, next) => {
    if (!toValue(interruptFlag)) {
      next()
      return
    }
    //
    setTimeout(() => {
      beforeAfterFn().then(next)
    }, 100)
  })
}
