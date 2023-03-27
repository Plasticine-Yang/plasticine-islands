import vitePluginReact from '@vitejs/plugin-react'
import type { PluginOption } from 'vite'

import type { ResolvedConfig } from '@plasticine-islands/types'
import vitePluginDevServerHtml from '@plasticine-islands/vite-plugin-dev-server-html'
import vitePluginPlasticineIslandsSiteConfig from '@plasticine-islands/vite-plugin-plasticine-islands-site-config'

import { CLIENT_ENTRY_PATH, DEV_SERVER_HTML_PATH } from '../constants'

export function resolveVitePlugins(resolvedConfig: ResolvedConfig): PluginOption[] {
  const { siteConfig } = resolvedConfig

  return [
    vitePluginReact(),

    vitePluginDevServerHtml({
      htmlPath: DEV_SERVER_HTML_PATH,
      clintEntryPath: CLIENT_ENTRY_PATH,
    }),

    vitePluginPlasticineIslandsSiteConfig(siteConfig),
  ]
}
