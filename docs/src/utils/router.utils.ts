import type { Component } from 'vue'

export function genComponents() {
  const context = import.meta.webpackContext('../docs/', {
    recursive: true,
    regExp: /\.mdx$/,
  })
  return context.keys().reduce((base, item) => {
    base[item.replace('./', '').replace('.md', '')] = (context(item) as unknown as any).default
    return base
  }, {} as Record<string, Component>)
}
