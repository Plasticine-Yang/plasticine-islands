export interface VitePluginPlasticineIslandsConventionalBasedRoutingOptions {
  root: string
}

export interface RouteMeta {
  /** @description 在文件系统中的绝对路径 */
  fileAbsolutePath: string

  /** @description 映射之后的路由路径 */
  routePath: string
}
