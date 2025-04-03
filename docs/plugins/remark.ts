import type { Plugin } from 'unified'
import { resolve } from 'node:path'
import fsExtra from 'fs-extra'
import { visit } from 'unist-util-visit'

// 定义配置接口
interface RemarkCodeSrcOptions {
  basePath?: string
}

// 定义 MDX JSX 节点类型（简化版，实际类型更复杂）
interface MdxJsxAttribute {
  type: 'mdxJsxAttribute'
  name: string
  value: string | null
}

function parseAttr(attributes: MdxJsxAttribute[], key: string) {
  const value = attributes.find((attr: any) => attr.name === key)
  if (!value) {
    return null
  }
  return value?.value
}

export function remarkCodeSrc(): Plugin<[RemarkCodeSrcOptions?], any> {
  return (tree) => {
    visit(tree, (node: any) => {
      if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        if (node.name === 'DemoBlock') {
          const src = parseAttr(node.attributes, 'src')

          if (src) {
            const filePath = resolve(`./src/example/${src}`)
            const code = fsExtra.readFileSync(filePath, 'utf-8')
            node.attributes.push({
              type: 'mdxJsxAttribute',
              name: 'source',
              value: code,
            })
          }
        }
      }
    })
  }
}
