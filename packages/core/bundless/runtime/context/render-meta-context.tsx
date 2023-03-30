import { createContext } from 'react'

export interface RenderMeta {
  /**
   * @description 渲染模式
   * @default client
   */
  mode: 'client' | 'server'
}

export const RenderMetaContext = createContext<RenderMeta>({
  mode: 'client',
})
