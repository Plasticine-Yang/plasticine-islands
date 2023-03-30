import type { RouteObject } from 'react-router-dom'

import Bar from './demo/Bar'
import Foo from './demo/Foo'

export const routes: RouteObject[] = [
  {
    path: '/foo',
    element: <Foo />,
  },
  {
    path: '/bar',
    element: <Bar />,
  },
]
