/** @description vite-plugin-dev-server-html-options 插件参数 */
export interface VitePluginDevServerHtmlOptions {
  /** @description 要加载的 html 文件路径 */
  htmlPath: string

  /**
   * @description 是否需要在插件运行过程中出错时加载默认的 html
   * @default true
   */
  loadDefaultHtmlOnError?: boolean
}
