import { resolve } from 'path'

import ejs from 'ejs'
import fsExtra from 'fs-extra'
import ora from 'ora'
import type { OutputChunk } from 'rollup'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import type { BuildHtmlEjsData, ResolvedConfig, ServerRenderFunc } from '@plasticine-islands/types'

import { BUILD_HTML_PATH, DEFAULT_BUILD_HTML_TITLE, SERVER_BUNDLE_DIRECTORY_NAME } from '../constants'

const { ensureDir, readFile, remove, writeFile } = fsExtra

interface RenderPageOptions {
  /** @description 用户定义在配置文件中定义的配置 */
  resolvedConfig: ResolvedConfig

  /** @description 客户端入口 bundle 后的 chunk */
  clientEntryChunk: OutputChunk

  /** @description 服务端渲染函数 - 用于将 React 组件渲染成 html 字符串 */
  serverRender: ServerRenderFunc
}

export async function renderPage(options: RenderPageOptions) {
  const { resolvedConfig, clientEntryChunk, serverRender } = options
  const { root, buildConfig } = resolvedConfig
  const { outDirectoryName } = buildConfig
  const spinner = ora('rendering page...\n').start()

  try {
    // 读取模板并注入数据
    const template = await readFile(BUILD_HTML_PATH, 'utf-8')
    const html = ejs.render(template, {
      title: DEFAULT_BUILD_HTML_TITLE,
      serverRenderedString: serverRender(),
      clientEntryChunkPath: clientEntryChunk.fileName,
    } as BuildHtmlEjsData)

    // 将结果写入构建目录中
    await ensureDir(resolve(root, BASE_DIRECTORY, outDirectoryName))
    await writeFile(resolve(root, BASE_DIRECTORY, outDirectoryName, 'index.html'), html)

    // 移除服务端构建产物
    await remove(resolve(root, BASE_DIRECTORY, SERVER_BUNDLE_DIRECTORY_NAME))

    spinner.succeed('render page successfully!')
  } catch (error) {
    spinner.fail('渲染页面过程出错\n')
    console.error(error)
  }
}
