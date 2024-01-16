import antfu from '@antfu/eslint-config'

export default antfu(
  { vue: true, typescript: true, ignore: ['node_modules', 'dist', 'shims-vue.d.ts'] },
  {
    // add your custom rules here
    // https://eslint.vuejs.org/user-guide/#how-to-use-custom-rules
    rules: {
      // maxlength
      // 'max-len': ['error', { code: 150, tabWidth: 2 }],
    },
  },
)
