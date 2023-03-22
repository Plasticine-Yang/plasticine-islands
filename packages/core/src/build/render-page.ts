import fsExtra from 'fs-extra'

import type { OutputChunk } from 'rollup'

import ejs from 'ejs'
import ora from 'ora'

import type { BuildConfig, BuildHtmlEjsData, ServerRenderFunc } from '@plasticine-islands/types'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import { resolve } from 'path'
import {
  BUILD_HTML_PATH,
  CLIENT_BUNDLE_DIRECTORY_NAME,
  DEFAULT_BUILD_HTML_TITLE,
  SERVER_BUNDLE_DIRECTORY_NAME,
} from '../constants'

const { ensureDir, readFile, remove, writeFile } = fsExtra

export async function renderPage(
  root: string,
  serverRender: ServerRenderFunc,
  clientEntryChunk: OutputChunk,
  buildConfig: BuildConfig,
) {
  const { outDirectoryName = CLIENT_BUNDLE_DIRECTORY_NAME } = buildConfig
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
