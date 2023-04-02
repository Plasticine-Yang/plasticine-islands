import { resolve } from 'path'

import type { RouteMeta } from '@plasticine-islands/types'

import { ConventionalBasedRoutingService } from '../../conventional-based-routing-service'

describe('ConventionalBasedRoutingService', () => {
  const dirToScan = resolve(__dirname, 'fixtures')
  // 用于替代真实文件路径，保证单测在不同机器上运行都得到相同的结果
  const testDir = 'path/to/fixtures'
  const conventionalBasedRoutingService = new ConventionalBasedRoutingService(dirToScan)

  test('文件系统路径映射到路由系统路径', () => {
    const routeMetaList: RouteMeta[] = conventionalBasedRoutingService.getRouteMetaList().map((routeMeta) => ({
      ...routeMeta,
      // 避免真实路径出现，影响在不同机器上运行单测的效果
      fileAbsolutePath: routeMeta.fileAbsolutePath.replace(dirToScan, testDir),
    }))

    expect(routeMetaList).toMatchInlineSnapshot(`
      [
        {
          "fileAbsolutePath": "path/to/fixtures/bar/baz.ts",
          "routePath": "/bar/baz",
        },
        {
          "fileAbsolutePath": "path/to/fixtures/bar/index.ts",
          "routePath": "/bar",
        },
        {
          "fileAbsolutePath": "path/to/fixtures/foo.ts",
          "routePath": "/foo",
        },
        {
          "fileAbsolutePath": "path/to/fixtures/index.ts",
          "routePath": "/",
        },
      ]
    `)
  })

  test('生成 routes 数组代码', () => {
    expect(conventionalBasedRoutingService.generateRoutesCode().replaceAll(dirToScan, testDir)).toMatchInlineSnapshot(`
      "export const routes = [{
        path: '/bar/baz',
        lazy: async () => ({
          Component: (await import('path/to/fixtures/bar/baz.ts')).default
        })
      },{
        path: '/bar',
        lazy: async () => ({
          Component: (await import('path/to/fixtures/bar/index.ts')).default
        })
      },{
        path: '/foo',
        lazy: async () => ({
          Component: (await import('path/to/fixtures/foo.ts')).default
        })
      },{
        path: '/',
        lazy: async () => ({
          Component: (await import('path/to/fixtures/index.ts')).default
        })
      }]"
    `)
  })
})
