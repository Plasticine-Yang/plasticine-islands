import { defineConfig } from 'tsup'
import { mkdist } from 'mkdist'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist/main',
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  clean: true,
  shims: true,
  async onSuccess() {
    await mkdist({
      srcDir: './bundless',
      distDir: './dist/bundless',
    })
  },
})
