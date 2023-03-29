import chalk from 'chalk'
import type { Plugin } from 'vite'

import type { VitePluginPlasticineIslandsSiteConfigOptions } from '@plasticine-islands/types'
import { relative } from 'path'

const virtualModuleId = 'virtual:plasticine-islands-site-config'
const resolvedVirtualModuleId = '\0' + virtualModuleId

export default function vitePluginPlasticineIslandsSiteConfig(
  options: VitePluginPlasticineIslandsSiteConfigOptions,
): Plugin {
  const { resolvedConfig, onDevServerRestart } = options
  const { root, siteConfig, configFilePath } = resolvedConfig

  return {
    name: 'plasticine-islands-site-config',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(siteConfig)}`
      }
    },

    // 配置文件更新时重启 Dev Server
    async handleHotUpdate(ctx) {
      const filesToWatch = [configFilePath]
      const include = (filePath: string) => filesToWatch.some((file) => file.includes(filePath))

      if (include(ctx.file)) {
        console.log(chalk.cyan(`\n配置文件 ${relative(root, configFilePath)} 改动，重启开发服务器...\n`))
        await onDevServerRestart()
      }
    },
  }
}
