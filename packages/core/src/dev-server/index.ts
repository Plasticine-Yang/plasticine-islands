import { createServer as createViteServer } from 'vite'

import { ResolvedConfig } from '@plasticine-islands/types'

import { resolveVitePlugins } from '../helpers'

export function createDevServer(resolvedConfig: ResolvedConfig, onDevServerRestart: () => Promise<void>) {
  const { root } = resolvedConfig

  return createViteServer({
    root,
    plugins: resolveVitePlugins({ resolvedConfig, onDevServerRestart }),
  })
}
