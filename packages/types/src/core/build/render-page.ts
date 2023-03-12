/** @description 构建产物的 html 中支持注入的 ejs 数据 */
export interface BuildHtmlEjsData {
  /** @description 页面标题 */
  title?: string

  /** @description 服务端渲染出的 string */
  serverRenderedString?: string

  /** @description 用于 hydration 的客户端代码 */
  clientEntryChunkPath?: string
}
