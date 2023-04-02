import vitePluginReact from '@vitejs/plugin-react'
import { PluginOption } from 'vite'

import type { ResolvedConfig, VitePluginPlasticineIslandsSiteConfigOptions } from '@plasticine-islands/types'
import vitePluginPlasticineIslandsConventionalBasedRouting from '@plasticine-islands/vite-plugin-conventional-based-routing'
import vitePluginDevServerHtml from '@plasticine-islands/vite-plugin-dev-server-html'
import vitePluginPlasticineIslandsSiteConfig from '@plasticine-islands/vite-plugin-plasticine-islands-site-config'

import { CLIENT_ENTRY_PATH, DEV_SERVER_HTML_PATH } from '../constants'

interface ResolveVitePluginsOptions {
  resolvedConfig: ResolvedConfig
  onDevServerRestart?: VitePluginPlasticineIslandsSiteConfigOptions['onDevServerRestart']
}

export function resolveVitePlugins(options: ResolveVitePluginsOptions): PluginOption[] {
  const { resolvedConfig, onDevServerRestart } = options
  const { root } = resolvedConfig

  return [
    // react
    vitePluginReact(),

    // dev server
    vitePluginDevServerHtml({
      htmlPath: DEV_SERVER_HTML_PATH,
      clintEntryPath: CLIENT_ENTRY_PATH,
    }),

    // 通过虚拟模块让前端应用使用配置文件中的 SiteConfig 数据
    vitePluginPlasticineIslandsSiteConfig({
      resolvedConfig,
      onDevServerRestart,
    }),

    // 约定式路由
    vitePluginPlasticineIslandsConventionalBasedRouting({ root }),
  ]
}
