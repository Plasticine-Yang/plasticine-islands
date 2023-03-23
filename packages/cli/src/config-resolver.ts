import { loadConfig } from 'unconfig'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import type { BuildConfig, PlasticineIslandsConfig, ResolvedConfig } from '@plasticine-islands/types'

import { resolve } from 'path'
import { DEFAULT_OUT_DIRECTORY_NAME } from './constants'

export async function resolveConfig(root: string): Promise<ResolvedConfig> {
  const loadedConfig = await loadConfig<PlasticineIslandsConfig | undefined>({
    sources: [
      {
        files: 'plasticine-islands.config',
        extensions: ['ts', 'js'],
      },
    ],
    merge: false,
    cwd: resolve(root, BASE_DIRECTORY),
  })

  const { config = {}, sources } = loadedConfig

  return {
    root,
    configPath: sources.at(0) ?? '',
    buildConfig: resolveBuildConfig(config),
  }
}

function resolveBuildConfig(config: PlasticineIslandsConfig): BuildConfig {
  const { outDirectoryName } = config.build ?? {}

  return {
    outDirectoryName: outDirectoryName ?? DEFAULT_OUT_DIRECTORY_NAME,
  }
}

export function defineConfig(config: PlasticineIslandsConfig) {
  return config
}
