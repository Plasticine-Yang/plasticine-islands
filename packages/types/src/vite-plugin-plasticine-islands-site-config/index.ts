import type { ResolvedConfig } from '../config'

export interface VitePluginPlasticineIslandsSiteConfigOptions {
  resolvedConfig: ResolvedConfig
  onDevServerRestart: () => Promise<void>
}
