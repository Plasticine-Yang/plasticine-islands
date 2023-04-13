import vitePluginReact from '@vitejs/plugin-react'
import { PluginOption } from 'vite'

import type { ResolvedConfig, VitePluginPlasticineIslandsSiteConfigOptions } from '@plasticine-islands/types'
import vitePluginPlasticineIslandsConventionalBasedRouting from '@plasticine-islands/vite-plugin-conventional-based-routing'
import vitePluginDevServerHtml from '@plasticine-islands/vite-plugin-dev-server-html'
import vitePluginMdx from '@plasticine-islands/vite-plugin-mdx'
import vitePluginPlasticineIslandsSiteConfig from '@plasticine-islands/vite-plugin-plasticine-islands-site-config'

import { BUNDLESS_PATH, CLIENT_ENTRY_PATH, DEV_SERVER_HTML_PATH } from '../constants'

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
      resolvedConfig,
      htmlPath: DEV_SERVER_HTML_PATH,
      clintEntryPath: CLIENT_ENTRY_PATH,
      loadDefaultHtmlOnError: true,
      filesToWatch: [BUNDLESS_PATH],
    }),

    // 通过虚拟模块让前端应用使用配置文件中的 SiteConfig 数据
    vitePluginPlasticineIslandsSiteConfig({
      resolvedConfig,
      onDevServerRestart,
    }),

    // 约定式路由
    vitePluginPlasticineIslandsConventionalBasedRouting({ root }),

    // mdx
    vitePluginMdx(),
  ]
}
