import { build as viteBuild, type InlineConfig } from 'vite'

import ora from 'ora'
import type { RollupOutput } from 'rollup'

import type { BuildCommandOptions } from '@plasticine-islands/types'

import { CLIENT_ENTRY_PATH, SERVER_BUNDLE_PATH, SERVER_ENTRY_PATH } from '../constants'

/**
 * @description 构建客户端和服务端产物
 * @param root 命令执行的目标路径
 * @returns [clientBundle, serverBundle]
 */
export async function bundle(root: string, options: BuildCommandOptions) {
  const spinner = ora('building client + server bundles...\n').start()

  try {
    const clientViteConfig = resolveViteConfig(root, 'client', options)
    const serverViteConfig = resolveViteConfig(root, 'server', options)

    const [clientBundle, serverBundle] = await Promise.all([viteBuild(clientViteConfig), viteBuild(serverViteConfig)])
    spinner.succeed('build client + server bundles successfully!')

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput]
  } catch (error) {
    spinner.fail('构建客户端和服务端产物过程出错')
    console.error(error)
  }
}

function resolveViteConfig(root: string, target: 'client' | 'server', options: BuildCommandOptions): InlineConfig {
  const { outdir } = options
  const isServer = target === 'server'

  return {
    mode: 'production',
    root,
    build: {
      outDir: isServer ? SERVER_BUNDLE_PATH : outdir,
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
