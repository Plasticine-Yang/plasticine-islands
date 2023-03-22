export interface BuildConfig {
  /**
   * @description 产物的目录名
   * @default dist
   */
  outDirectoryName?: string
}

export interface PlasticineIslandsConfig {
  build?: BuildConfig
}

export interface LoadedConfig {
  config: PlasticineIslandsConfig
  sources: string[]
}
