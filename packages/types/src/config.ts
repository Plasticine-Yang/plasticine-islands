import { DeepPartial, DeepRequired } from './utils'

export interface BuildConfig {
  /**
   * @description 产物的目录名
   * @default dist
   */
  outDirectoryName: string
}

export interface SiteConfig {
  /**
   * @description 网站标题
   * @default plasticine-islands
   */
  title?: string
}

export interface PlasticineIslandsConfig {
  /** @description build 命令相关配置 */
  build?: DeepPartial<BuildConfig>

  /** @description 站点配置 */
  siteConfig?: DeepPartial<SiteConfig>
}

export interface ResolvedConfig {
  /** @description 执行 cli 命令时指定的 root 目录 */
  root: string

  /** @description 配置文件的路径 */
  configPath: string

  /** @description build 命令相关配置 */
  buildConfig: DeepRequired<BuildConfig>

  /** @description 站点配置 - 会暴露给前端应用 */
  siteConfig: DeepRequired<SiteConfig>
}
