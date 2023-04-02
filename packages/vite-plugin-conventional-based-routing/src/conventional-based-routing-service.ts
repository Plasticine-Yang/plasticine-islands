import { relative } from 'path'

import fg from 'fast-glob'
import { normalizePath } from 'vite'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import type { RouteMeta } from '@plasticine-islands/types'

export class ConventionalBasedRoutingService {
  private dirToScan: string
  private routeMetaList: RouteMeta[] = []

  constructor(dirToScan: string) {
    this.dirToScan = dirToScan
    this.init()
  }

  private init() {
    // 扫描文件系统，匹配目标文件
    const files = fg
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.dirToScan,
        absolute: true,
        ignore: ['**/node_modules/**', BASE_DIRECTORY],
      })
      .sort()

    // 生成 RouteMeta
    for (const fileAbsolutePath of files) {
      // 获取文件的相对路径
      const fileRelativePath = normalizePath(relative(this.dirToScan, fileAbsolutePath))

      // 将文件相对路径转换成路由路径
      const routePath = normalizeRoutePath(fileRelativePath)

      this.routeMetaList.push({
        routePath,
        fileAbsolutePath,
      })
    }
  }

  public getRouteMetaList() {
    return this.routeMetaList
  }

  /**
   * @description 生成 react-router-dom 所需的 routes 数组代码
   */
  public generateRoutesCode() {
    const _generateRoutesCode = () => {
      return this.routeMetaList
        .map((routeMeta: RouteMeta) => {
          const { fileAbsolutePath, routePath } = routeMeta

          return `
{
  path: '${routePath}',
  lazy: async () => ({
    Component: (await import('${fileAbsolutePath}')).default
  })
}
      `.trim()
        })
        .join(',')
    }

    const code = `
export const routes = [${_generateRoutesCode()}]
  `.trim()

    return code
  }
}

function normalizeRoutePath(rawRoutePath: string) {
  const handledRoutePath = rawRoutePath
    // 去除文件名后缀 - e.g. index.tsx -> index
    .replace(/\.(.*)?$/, '')
    // 将 index 或 /index 移除
    .replace(/\/?index$/, '')

  // 确保路由路径是以 `/` 开头
  return handledRoutePath.startsWith('/') ? handledRoutePath : `/${handledRoutePath}`
}
