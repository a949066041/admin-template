export function genComponents() {
  return Object.entries(import.meta.glob('@/docs/**/*.md')).reduce((base, [k, v]) => {
    base[k.replace('/src/docs/', '').replace('.md', '')] = v
    return base
  }, {} as Record<string, () => Promise<unknown>>)
}
