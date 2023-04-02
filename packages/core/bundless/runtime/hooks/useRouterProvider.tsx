import type { ReactElement } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from 'virtual:conventional-based-routing'

import { useRenderMeta } from '../../runtime/hooks'

export function useRouterProvider() {
  const { mode } = useRenderMeta()
  let res: { renderRouterProvider: () => ReactElement }

  if (mode === 'client') {
    const router = createBrowserRouter(routes)
    res = {
      renderRouterProvider() {
        return <RouterProvider router={router} />
      },
    }
  } else if (mode === 'server') {
    // TODO
    res = {
      renderRouterProvider() {
        return <div>ssr</div>
      },
    }
  }

  return res
}
