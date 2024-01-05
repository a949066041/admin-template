import type { App, VNode } from 'vue'

export const provideSymbol = Symbol('naive-config')

export interface INaiveConfig {
  dict?: (key: string, value: string) => VNode
}
export function confNaive(app: App, config: INaiveConfig) {
  app.provide(provideSymbol, config)
}
