import { isAbsolute, join } from 'path'
import { normalizePath, type Plugin } from 'vite'

import type { VitePluginPlasticineIslandsConventionalBasedRoutingOptions } from '@plasticine-islands/types'

import { ConventionalBasedRoutingService } from './conventional-based-routing-service'

const virtualModuleId = 'virtual:conventional-based-routing'
const resolvedVirtualModuleId = '\0' + virtualModuleId

export default function vitePluginPlasticineIslandsConventionalBasedRouting(
  options: VitePluginPlasticineIslandsConventionalBasedRoutingOptions,
): Plugin {
  const { root } = options
  let conventionalBasedRoutingService: ConventionalBasedRoutingService

  return {
    name: 'vite-plugin-conventional-based-routing',

    configResolved() {
      let dirToScan = isAbsolute(root) ? join(root) : join(process.cwd(), root)
      dirToScan = normalizePath(dirToScan)

      conventionalBasedRoutingService = new ConventionalBasedRoutingService(dirToScan)
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return conventionalBasedRoutingService.generateRoutesCode()
      }
    },
  }
}
