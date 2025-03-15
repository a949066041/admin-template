import type { Component, DirectiveBinding, ObjectDirective } from 'vue'
import { createApp } from 'vue'

export type IBindElement = {
  [key: string]: { instance: any } | any
} & Element

function addClass(el: Element, className: string) {
  if (!el.classList.contains(className))
    el.classList.add(className)
}

function removeClass(el: Element, className: string) {
  el.classList.remove(className)
}

export default function createVNodeDirectives(Comp: Component) {
  return {
    mounted(el: IBindElement, binding: DirectiveBinding) {
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name || '__vue__'
      if (!el[name])
        el[name] = {}

      ;(instance.$el as Element).classList.add('center-absolute')
      el[name]!.instance = instance

      if (binding.value)
        append(el)
    },
    updated(el: IBindElement, binding: DirectiveBinding) {
      if (binding.value !== binding.oldValue)
        binding.value ? append(el) : remove(el)
    },
  } as ObjectDirective

  function append(el: IBindElement) {
    const name = Comp.name || '__vue__'
    const style = getComputedStyle(el)
    if (!['absolute', 'fixed', 'relative'].includes(style.position))
      addClass(el, 'relative')

    el.appendChild(el[name]!.instance.$el)
  }

  function remove(el: IBindElement) {
    const name = Comp.name || '__vue__'
    removeClass(el, 'relative')
    el.removeChild(el[name]!.instance.$el)
  }
}
