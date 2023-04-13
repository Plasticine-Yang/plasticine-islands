import { relative } from 'path'

import chalk from 'chalk'
import type { Plugin } from 'vite'

import { CliCommand, type VitePluginPlasticineIslandsSiteConfigOptions } from '@plasticine-islands/types'

const virtualModuleId = 'virtual:plasticine-islands-site-config'
const resolvedVirtualModuleId = '\0' + virtualModuleId

export default function vitePluginPlasticineIslandsSiteConfig(
  options: VitePluginPlasticineIslandsSiteConfigOptions,
): Plugin {
  const { resolvedConfig, onDevServerRestart } = options
  const { root, command, siteConfig, configFilePath, filesToWatch } = resolvedConfig

  return {
    name: 'plasticine-islands-site-config',

    config() {
      return {
        root: command === CliCommand.Dev ? '__PLASTICINE_DEV_SERVER_ROOT__' : root,
      }
    },

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

    configureServer(server) {
      server.watcher.add(filesToWatch)
    },

    // 配置文件 & 全局配置的监听文件更新时重启 Dev Server
    async handleHotUpdate(ctx) {
      const _filesToWatch = [configFilePath, ...filesToWatch]
      const include = (filePath: string) => _filesToWatch.some((file) => filePath.includes(file))

      if (include(ctx.file)) {
        if (ctx.file.includes(configFilePath)) {
          log(relative(root, configFilePath), '配置文件改变，重启开发服务器...')
        } else {
          log(ctx.file, '全局配置的监听文件发生变化，重启开发服务器...')
        }
        await onDevServerRestart()
      }
    },
  }
}

function log(filePath: string, info: string) {
  console.log(`\n${chalk.bgGreen(` File Changed `)} ${chalk.greenBright(`${filePath}`)}`)
  console.log(chalk.cyan(`${info}\n`))
}
