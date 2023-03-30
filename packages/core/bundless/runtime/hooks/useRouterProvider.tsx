import type { ReactElement } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useRenderMeta } from '../../runtime/hooks'
import { routes } from '../../runtime/routes'

export function useRouterProvider() {
  const { mode } = useRenderMeta()

  let res: { renderRouterProvider: () => ReactElement }

  if (mode === 'client') {
    const router = createBrowserRouter(routes)
    res = {
      renderRouterProvider: () => <RouterProvider router={router} />,
    }
  } else if (mode === 'server') {
    // TODO
  }

  return res
}
