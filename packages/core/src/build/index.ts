import { resolve } from 'path'
import type { OutputChunk } from 'rollup'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import type { LoadedConfig, ServerBundleModule } from '@plasticine-islands/types'

import { SERVER_BUNDLE_DIRECTORY_NAME, SERVER_BUNDLE_NAME } from '../constants'
import { bundle } from './bundle'
import { renderPage } from './render-page'

export async function build(root: string, loadedConfig: LoadedConfig) {
  const { build: buildConfig = {} } = loadedConfig.config

  const [clientBundle] = await bundle(root, buildConfig)

  // 加载服务端构建产物中的 render 函数
  const serverBundleModulePath = resolve(root, BASE_DIRECTORY, SERVER_BUNDLE_DIRECTORY_NAME, SERVER_BUNDLE_NAME)
  const { render }: ServerBundleModule = await import(serverBundleModulePath)

  // 获取客户端产物的入口地址
  const clientEntryChunk = clientBundle.output.find((item) => item.type === 'chunk' && item.isEntry) as OutputChunk

  renderPage(root, render, clientEntryChunk, buildConfig)
}
