import antfu from '@antfu/eslint-config'

export default antfu(
  { vue: true, typescript: true },
  {
    rules: {
      'node/prefer-global/process': ['error', 'always' | 'never'],
    },
  },
)
