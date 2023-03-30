import type { Plugin } from 'vite'

import type { VitePluginPlasticineIslandsConventionalBasedRoutingOptions } from '@plasticine-islands/types'

const virtualModuleId = 'virtual:plasticine-islands-routes'
const resolvedVirtualModuleId = '\0' + virtualModuleId

export default function vitePluginPlasticineIslandsConventionalBasedRouting(
  options: VitePluginPlasticineIslandsConventionalBasedRoutingOptions,
): Plugin {
  const { root } = options

  return {
    name: 'plasticine-islands-conventional-based-routing',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return ``
      }
    },
  }
}
