export type ServerRenderFunc = () => string

/** @description 服务端构建产物的模块类型 */
export interface ServerBundleModule {
  /** @description 服务端渲染组件为字符串 */
  render: ServerRenderFunc
}

export * from './render-page'
