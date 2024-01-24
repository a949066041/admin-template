import { resolve } from 'node:path'
import { baseParse } from '@vue/compiler-core'
import type { ElementNode } from '@vue/compiler-core'
import type MarkdownIt from 'markdown-it'
import fsExtra from 'fs-extra'

const DemoTag = 'demo'
export function parseProps(content: string) {
  const ast = baseParse(content)
  const demoElement = ast.children[0] as ElementNode
  const res: Record<string, any> = {}
  demoElement.props.forEach((v) => {
    res[v.name] = (v as any).value.content
  })
  return res
}

export function demoBlockPlugin(md: MarkdownIt) {
  const addRenderRule = (type: string) => {
    const defaultRender = md.renderer.rules[type]

    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      const content = token.content.trim()

      if (!content.startsWith(`<${DemoTag} `))
        return defaultRender!(tokens, idx, options, env, self)

      // parse props
      const props = parseProps(content)
      if (!props.src)
        return defaultRender!(tokens, idx, options, env, self)

      const filePath = resolve(`src/example/${props.src}`)
      // get source code
      const code = fsExtra.readFileSync(filePath, 'utf-8')
      // inject source code
      if (!content.includes(`<${DemoTag} source=`)) {
        tokens[idx].content = content.replace(
					`<${DemoTag}`,
					`<${DemoTag} source="${encodeURIComponent(code.trim())}" `,
        )
      }

      return defaultRender!(tokens, idx, options, env, self)
    }
  }

  addRenderRule('html_block')
  addRenderRule('html_inline')
}
