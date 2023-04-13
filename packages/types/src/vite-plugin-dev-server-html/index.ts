import type { ResolvedConfig } from '../config'

/** @description vite-plugin-dev-server-html-options 插件参数 */
export interface VitePluginDevServerHtmlOptions {
  resolvedConfig: ResolvedConfig

  /** @description 要加载的 html 文件路径 */
  htmlPath: string

  /**
   * @description 是否需要在插件运行过程中出错时加载默认的 html
   * @default true
   */
  loadDefaultHtmlOnError?: boolean

  /** @description 客户端运行时代码的入口，传入该配置项后会在生成的 html 中注入 script 标签加载客户端运行时代码 */
  clintEntryPath?: string

  /** @description 配置在变化时热更新的文件 */
  filesToWatch?: string[]
}
