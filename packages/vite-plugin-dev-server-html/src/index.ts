import type { HtmlTagDescriptor, Plugin } from 'vite'

import { readFile } from 'fs/promises'
import { resolve } from 'path'

import type { VitePluginDevServerHtmlOptions } from '@plasticine-islands/types'

const DEFAULT_HTML_PATH = resolve(__dirname, '../bundless/default.html')

/**
 * @description 为 vite 开发环境服务器加载 html 作为入口
 */
export default function vitePluginDevServerHtml(options: VitePluginDevServerHtmlOptions): Plugin {
  const { resolvedConfig, htmlPath, loadDefaultHtmlOnError, clintEntryPath, filesToWatch } = options
  const { root } = resolvedConfig

  return {
    name: 'vite-plugin-dev-server-html',
    apply: 'serve',
    configureServer(server) {
      filesToWatch && server.watcher.add(filesToWatch)

      // 由于修改了开发环境下的 root，因此 Dev Server 不会监听真实 root 的变化，所以需要手动加回监听
      server.watcher.add(root)

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
    // 为 html 注入加载客户端运行时代码的 script 标签
    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = []

      if (clintEntryPath !== undefined) {
        const scriptTag: HtmlTagDescriptor = {
          tag: 'script',
          attrs: {
            type: 'module',
            src: `/@fs/${clintEntryPath}`,
          },
          injectTo: 'body',
        }

        tags.push(scriptTag)
      }

      return {
        html,
        tags,
      }
    },
  }
}

export type { VitePluginDevServerHtmlOptions }
