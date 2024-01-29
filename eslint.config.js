import antfu from '@antfu/eslint-config'

export default antfu(
  { vue: true, typescript: true, ignore: ['node_modules', 'dist', 'shims-vue.d.ts'] },
  {
    rules: {
    },
  },
)
