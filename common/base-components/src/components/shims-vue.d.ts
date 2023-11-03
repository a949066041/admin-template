declare module 'vue-virtual-scroller' {
  import type { Component, ComponentOptions, PluginObject } from 'vue'
  import type Vue from 'vue'

  interface PluginOptions {
    installComponents?: boolean
    componentsPrefix?: string
  }

  const plugin: PluginObject<PluginOptions> & { version: string }

  export const RecycleScroller: Component<any, any, any, any>
  export const DynamicScroller: Component<any, any, any, any>
  export const DynamicScrollerItem: Component<any, any, any, any>

  export function IdState(options?: {
    idProp?: (vm: any) => any
  }): ComponentOptions<Vue> | typeof Vue

  export default plugin
}
