import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    {
      input: 'src/bundless',
      outDir: 'dist',
      builder: 'mkdist',
    },
  ],
  rollup: {
    emitCJS: true,
    cjsBridge: true,
  },
  declaration: true,
})
