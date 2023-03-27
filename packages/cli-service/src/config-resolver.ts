import { resolve } from 'path'

import { loadConfig } from 'unconfig'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import type {
  BuildConfig,
  DeepRequired,
  PlasticineIslandsConfig,
  ResolvedConfig,
  SiteConfig,
} from '@plasticine-islands/types'

import { DEFAULT_OUT_DIRECTORY_NAME, DEFAULT_TITLE } from './constants'

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
    siteConfig: resolveSiteConfig(config),
  }
}

function resolveBuildConfig(config: PlasticineIslandsConfig): DeepRequired<BuildConfig> {
  const { outDirectoryName } = config.build ?? {}

  return {
    outDirectoryName: outDirectoryName ?? DEFAULT_OUT_DIRECTORY_NAME,
  }
}

function resolveSiteConfig(config: PlasticineIslandsConfig): DeepRequired<SiteConfig> {
  const { title } = config.siteConfig ?? {}

  return {
    title: title ?? DEFAULT_TITLE,
  }
}

export function defineConfig(config: PlasticineIslandsConfig) {
  return config
}
