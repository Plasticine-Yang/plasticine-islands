import { resolve } from 'path'

import type { RouteMeta } from '@plasticine-islands/types'

import { ConventionalBasedRoutingService } from '../../conventional-based-routing-service'

describe('ConventionalBasedRoutingService', () => {
  const dirToScan = resolve(__dirname, 'fixtures')
  const conventionalBasedRoutingService = new ConventionalBasedRoutingService(dirToScan)

  test('文件系统路径映射到路由系统路径', () => {
    const routeMetaList: RouteMeta[] = conventionalBasedRoutingService.getRouteMetaList().map((routeMeta) => ({
      ...routeMeta,
      // 避免真实路径出现，影响在不同机器上运行单测的效果
      fileAbsolutePath: routeMeta.fileAbsolutePath.replace(dirToScan, 'path/to/fixtures'),
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
})
