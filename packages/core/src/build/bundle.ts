import { join } from 'path'

import ora from 'ora'
import type { RollupOutput } from 'rollup'
import { build as viteBuild, type InlineConfig } from 'vite'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import type { ResolvedConfig } from '@plasticine-islands/types'

import { CLIENT_ENTRY_PATH, SERVER_BUNDLE_DIRECTORY_NAME, SERVER_ENTRY_PATH } from '../constants'
import { resolveVitePlugins } from '../helpers'

/**
 * @description 构建客户端和服务端产物
 * @param root 命令执行的目标路径
 * @returns [clientBundle, serverBundle]
 */
export async function bundle(resolvedConfig: ResolvedConfig) {
  const spinner = ora('building client + server bundles...\n').start()

  try {
    const clientViteConfig = resolveViteConfig('client', resolvedConfig)
    const serverViteConfig = resolveViteConfig('server', resolvedConfig)

    const [clientBundle, serverBundle] = await Promise.all([viteBuild(clientViteConfig), viteBuild(serverViteConfig)])
    spinner.succeed('build client + server bundles successfully!')

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput]
  } catch (error) {
    spinner.fail('构建客户端和服务端产物过程出错')
    console.error(error)
  }
}

function resolveViteConfig(target: 'client' | 'server', resolvedConfig: ResolvedConfig): InlineConfig {
  const { root, buildConfig } = resolvedConfig
  const { outDirectoryName } = buildConfig
  const isServer = target === 'server'

  return {
    mode: 'production',
    root,
    build: {
      outDir: isServer ? join(BASE_DIRECTORY, SERVER_BUNDLE_DIRECTORY_NAME) : join(BASE_DIRECTORY, outDirectoryName),
      ssr: isServer ? true : false,
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: 'esm',
        },
      },
    },
    plugins: resolveVitePlugins({ resolvedConfig }),
  }
}
