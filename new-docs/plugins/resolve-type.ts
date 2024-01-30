import type { Plugin } from 'vite'

// const alias = {
//   admin: '@yy-admin/components-admin',
// }

export function MarkdownTransform(): Plugin {
  return {
    name: 'vueuse-md-transform',
    enforce: 'pre',
    transform(code, id) {
      if (!id.match(/\.md\b/))
        return null

      // const [pkg, _name] = id.split('/').slice(-2)
      return code
    },
  }
}
