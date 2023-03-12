import { type Plugin } from 'vite'

import { resolve } from 'path'
import { readFile } from 'fs/promises'

import type { VitePluginDevServerHtmlOptions } from '@plasticine-islands/types'

const DEFAULT_HTML_PATH = resolve(__dirname, 'default.html')

const DEFAULT_OPTIONS: VitePluginDevServerHtmlOptions = {
  htmlPath: DEFAULT_HTML_PATH,
  loadDefaultHtmlOnError: true,
}

/**
 * @description 为 vite 开发环境服务器加载 html 作为入口
 */
export default function vitePluginDevServerHtml(options: VitePluginDevServerHtmlOptions = DEFAULT_OPTIONS): Plugin {
  const { htmlPath, loadDefaultHtmlOnError } = options

  return {
    name: 'vite-plugin-dev-server-html',
    apply: 'serve',
    configureServer(server) {
      // 需要在 vite 内置的 middleware 运行完后再运行该 middleware
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html: string

          try {
            html = await readFile(htmlPath, 'utf-8')

            // 使用 vite 内置的 transform 处理 html，为其注入热更新相关代码
            req.url && (html = await server.transformIndexHtml(req.url, html, req.originalUrl))
          } catch (error) {
            if (loadDefaultHtmlOnError) {
              html = await readFile(DEFAULT_HTML_PATH, 'utf-8')
            } else {
              return next(error)
            }
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')
          res.end(html)
        })
      }
    },
  }
}

export type { VitePluginDevServerHtmlOptions }
