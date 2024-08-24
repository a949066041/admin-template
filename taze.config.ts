import { defineConfig } from 'taze'

export default defineConfig({
  force: true,
  // write to package.json
  write: true,
  // run `npm install` or `yarn install` right after bumping
  install: true,
  packageMode: {
    // '@rsbuild/core': 'patch',
  },
})
