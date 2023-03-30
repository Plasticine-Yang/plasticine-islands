import { useContext } from 'react'

import { RenderMetaContext } from '../context'

export function useRenderMeta() {
  return useContext(RenderMetaContext)
}
