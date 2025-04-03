export function MarkdownTransform(): any {
  return {
    name: 'vueuse-md-transform',
    enforce: 'pre',
    transform(code, id) {
      if (!id.match(/\.md\b/))
        return null

      return `${code}\n<n-anchor>
      <n-anchor-link title="演示" href="#演示">
        <n-anchor-link title="基础用法" href="#basic.vue" />
        <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
        <n-anchor-link title="固定" href="#affix.vue" />
        <n-anchor-link title="滚动到" href="#scrollto.vue" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
    </n-anchor>`
    },
  }
}
