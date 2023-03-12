import { createServer as createViteServer } from 'vite'

import vitePluginReact from '@vitejs/plugin-react'

import type { CreateDevServerOptions } from '@plasticine-islands/types'
import vitePluginDevServerHtml from '@plasticine-islands/vite-plugin-dev-server-html'

import { CLIENT_ENTRY_PATH, DEV_SERVER_HTML_PATH } from '../constants'

const defaultCreateDevServerOptions: CreateDevServerOptions = {
  root: process.cwd(),
}

export function createDevServer(options: CreateDevServerOptions = defaultCreateDevServerOptions) {
  const { root } = options

  return createViteServer({
    root,
    plugins: [
      vitePluginReact(),

      vitePluginDevServerHtml({
        htmlPath: DEV_SERVER_HTML_PATH,
        clintEntryPath: CLIENT_ENTRY_PATH,
      }),
    ],
  })
}
