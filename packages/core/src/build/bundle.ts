import ora from 'ora'
import { join } from 'path'
import type { RollupOutput } from 'rollup'
import { build as viteBuild, type InlineConfig } from 'vite'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import type { BuildConfig } from '@plasticine-islands/types'

import { CLIENT_BUNDLE_DIRECTORY_NAME, CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from '../constants'

/**
 * @description 构建客户端和服务端产物
 * @param root 命令执行的目标路径
 * @returns [clientBundle, serverBundle]
 */
export async function bundle(root: string, buildConfig: BuildConfig) {
  const spinner = ora('building client + server bundles...\n').start()

  try {
    const clientViteConfig = resolveViteConfig(root, 'client', buildConfig)
    const serverViteConfig = resolveViteConfig(root, 'server', buildConfig)

    const [clientBundle, serverBundle] = await Promise.all([viteBuild(clientViteConfig), viteBuild(serverViteConfig)])
    spinner.succeed('build client + server bundles successfully!')

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput]
  } catch (error) {
    spinner.fail('构建客户端和服务端产物过程出错')
    console.error(error)
  }
}

function resolveViteConfig(root: string, target: 'client' | 'server', buildConfig: BuildConfig): InlineConfig {
  const { outDirectoryName = CLIENT_BUNDLE_DIRECTORY_NAME } = buildConfig
  const isServer = target === 'server'

  return {
    mode: 'production',
    root,
    build: {
      outDir: isServer ? join(BASE_DIRECTORY, CLIENT_BUNDLE_DIRECTORY_NAME) : join(BASE_DIRECTORY, outDirectoryName),
      ssr: isServer ? true : false,
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: 'esm',
        },
      },
    },
  }
}
