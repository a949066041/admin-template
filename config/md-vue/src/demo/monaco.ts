// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import vueTypes from '@vue/runtime-core/dist/runtime-core.d.ts?raw'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import jsxTypes from '@vue/runtime-dom/dist/runtime-dom.d.ts?raw'

export async function initMonaco() {
  const monaco = await import('monaco-editor')

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    allowJs: true,
  })

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    jsxTypes,
    'jsx:type',
  )
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
    declare module 'vue' { ${vueTypes} }
  `,
    'ts:vue',
  )

  return monaco
}
