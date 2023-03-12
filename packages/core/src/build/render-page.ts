import { readFile, ensureDir, writeFile, remove } from 'fs-extra'

import type { OutputChunk } from 'rollup'

import ejs from 'ejs'
import ora from 'ora'

import type { BuildHtmlEjsData, ServerRenderFunc } from '@plasticine-islands/types'

import { BUILD_HTML_PATH, CLIENT_BUNDLE_PATH, DEFAULT_BUILD_HTML_TITLE, SERVER_BUNDLE_PATH } from '../constants'
import { resolve } from 'path'

export async function renderPage(root: string, serverRender: ServerRenderFunc, clientEntryChunk: OutputChunk) {
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
    await ensureDir(resolve(root, CLIENT_BUNDLE_PATH))
    await writeFile(resolve(root, CLIENT_BUNDLE_PATH, 'index.html'), html)

    // 移除服务端构建产物
    await remove(resolve(root, SERVER_BUNDLE_PATH))

    spinner.succeed('render page successfully!')
  } catch (error) {
    spinner.fail('渲染页面过程出错\n')
    console.error(error)
  }
}
