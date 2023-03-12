import { resolve } from 'path'

import type { OutputChunk } from 'rollup'

import type { ServerBundleModule } from '@plasticine-islands/types'

import { SERVER_BUNDLE_NAME, SERVER_BUNDLE_PATH } from '../constants'
import { bundle } from './bundle'
import { renderPage } from './render-page'

export async function build(root: string) {
  const [clientBundle] = await bundle(root)

  // 加载服务端构建产物中的 render 函数
  const serverBundleModulePath = resolve(root, SERVER_BUNDLE_PATH, SERVER_BUNDLE_NAME)
  const { render }: ServerBundleModule = await import(serverBundleModulePath)

  // 获取客户端产物的入口地址
  const clientEntryChunk = clientBundle.output.find((item) => item.type === 'chunk' && item.isEntry) as OutputChunk

  renderPage(root, render, clientEntryChunk)
}
