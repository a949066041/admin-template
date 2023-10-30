import { dirname, resolve, sep } from 'node:path'
import type { MarkdownRenderer } from 'vitepress'
import type { AttributeNode, ElementNode } from '@vue/compiler-core'
import { baseParse } from '@vue/compiler-core'
import fsExtra from 'fs-extra'
import { DEMO_TAG } from './constant'

let i = 0
function generateComponentNames() {
  return `DemoRender${i++}`
}

export function applyMdPlugins(md: MarkdownRenderer) {
  handleRenderRule(md, 'html_block')
  handleRenderRule(md, 'html_inline')
}

function handleRenderRule(md: MarkdownRenderer, type: string) {
  const defaultRender = md.renderer.rules[type]
  md.renderer.rules[type] = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const content = token.content.trim()
    if (!content.match(new RegExp(`^<${DEMO_TAG}\\s`)))
      return defaultRender!(tokens, idx, options, env, self)

    const ast = baseParse(content)
    const [demoEle] = ast.children as ElementNode[]
    const props = getPropsMap(demoEle.props as AttributeNode[])

    if (!props.src)
      return defaultRender!(tokens, idx, options, env, self)

    const { path } = env
    const componentDir = resolve(dirname(path), props.src)
    const renderNames = generateComponentNames()

    addDemoPath(renderNames, normalizePath(resolve(dirname(path), props.src)), env)

    const code = fsExtra.readFileSync(componentDir, 'utf-8')
    const highlightedCode = md.options.highlight!(code, 'vue', '')

    return `<${DEMO_TAG}
      code="${md.utils.escapeHtml(code)}"
      highlightedCode="${encodeURIComponent(highlightedCode)}"
      src="${path}"
      title="${props.title}"
      desc="${props.desc}"
    >
      <${renderNames} />
    </${DEMO_TAG}>
  `.trim()
  }
}

function addDemoPath(componentName: string, path: string, env: any) {
  const importComponent = `import ${componentName} from '${path}'`.trim()
  env.sfcBlocks.scripts.unshift({
    content: `
        <script lang="ts" setup >
          ${importComponent}
        </script>
      `.trim(),
  })
}

function getPropsMap(attrs: AttributeNode[]) {
  return attrs.reduce((base, { name, value }) => {
    base[name] = value?.content
    return base
  }, {} as Record<string, any>)
}

function normalizePath(path: string) {
  return path.split(sep).join('/')
}
