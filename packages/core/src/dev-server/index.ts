import { createServer as createViteServer } from 'vite'

import type { CreateDevServerOptions } from '@plasticine-islands/types'

const defaultCreateDevServerOptions: CreateDevServerOptions = {
  root: process.cwd(),
}

export function createDevServer(options: CreateDevServerOptions = defaultCreateDevServerOptions) {
  const { root } = options

  return createViteServer({
    root,
  })
}
