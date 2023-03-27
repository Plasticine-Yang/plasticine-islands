import type { Plugin } from 'vite'

import type { SiteConfig } from '@plasticine-islands/types'

const virtualModuleId = 'virtual:plasticine-islands-site-config'
const resolvedVirtualModuleId = '\0' + virtualModuleId

export default function vitePluginPlasticineIslandsSiteConfig(siteConfig: SiteConfig): Plugin {
  return {
    name: 'plasticine-islands-site-config',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(siteConfig)}`
      }
    },
  }
}
