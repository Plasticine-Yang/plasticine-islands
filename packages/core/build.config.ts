import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // 主入口
    './src/index',
    // bundless
    {
      input: './bundless',
      outDir: './dist/bundless',
      builder: 'mkdist',
    },
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true,
  },
  outDir: './dist/main',
  clean: true,
})
