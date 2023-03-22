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
  outDir: './dist/main',
  clean: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true,
  },
})
