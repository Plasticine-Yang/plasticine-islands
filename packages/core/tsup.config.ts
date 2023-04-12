import chokidar from 'chokidar'
import { mkdist } from 'mkdist'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist/main',
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  clean: true,
  shims: true,
  async onSuccess() {
    const watcher = chokidar.watch('./bundless').on('all', async () => {
      try {
        await mkdist({
          srcDir: './bundless',
          distDir: './dist/bundless',
        })
        console.log('mkdist[success]: bundless files changed')
      } catch (error) {
        console.error('mkdist[error]:', error)
      }
    })

    return () => {
      return watcher.close()
    }
  },
})
