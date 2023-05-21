import { useEventListener, useTimeoutFn } from '@vueuse/core'

export function useNoOperate(time: number, cb: () => void) {
  const { start: handleTimeReset } = useTimeoutFn(cb, time)

  useEventListener('mousemove', handleTimeReset)
  useEventListener('click', handleTimeReset)
  useEventListener('keydown', handleTimeReset)
}
