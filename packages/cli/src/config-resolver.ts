import { loadConfig as unconfigLoadConfig } from 'unconfig'

import { BASE_DIRECTORY } from '@plasticine-islands/shared'
import type { PlasticineIslandsConfig } from '@plasticine-islands/types'

import { resolve } from 'path'

export async function loadConfig(root: string) {
  const res = await unconfigLoadConfig<PlasticineIslandsConfig>({
    sources: [
      {
        files: 'plasticine-islands.config',
        extensions: ['ts', 'js'],
      },
    ],
    merge: false,
    cwd: resolve(root, BASE_DIRECTORY),
  })

  res.config = res.config ?? {}

  return res
}

export function defineConfig(config: PlasticineIslandsConfig) {
  return config
}
