import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    {
      input: 'src/bundless',
      outDir: './dist/bundless',
      builder: 'mkdist',
    },
  ],
  declaration: true,
  outDir: './dist/main',
  clean: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true,
  },
})
