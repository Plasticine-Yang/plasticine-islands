import { resolve } from 'path'

import { PACKAGES_ROOT } from './shared'

const CLI_DIST_PATH = resolve(PACKAGES_ROOT, 'cli/dist/index.js')
const CLI_SERVICE_PATH = resolve(PACKAGES_ROOT, 'cli-service/dist/index.js')
const SHARED_PATH = resolve(PACKAGES_ROOT, 'shared/dist/index.js')
const TYPES_PATH = resolve(PACKAGES_ROOT, 'types/dist/index.js')
const VITE_PLUGIN_CONVENTIONAL_BASED_ROUTING_DIST_PATH = resolve(
  PACKAGES_ROOT,
  'vite-plugin-conventional-based-routing/dist/index.js',
)
const VITE_PLUGIN_DEV_SERVER_HTML_DIST_PATH = resolve(PACKAGES_ROOT, 'vite-plugin-dev-server-html/dist/index.js')
const VITE_PLUGIN_PLASTICINE_ISLANDS_SITE_CONFIG_DIST_PATH = resolve(
  PACKAGES_ROOT,
  'vite-plugin-plasticine-islands-site-config/dist/index.js',
)
const VITE_PLUGIN_MDX_DIST_PATH = resolve(PACKAGES_ROOT, 'vite-plugin-mdx/dist/index.js')

/** @description 变化时重启开发服务器的文件 */
export const FILES_TO_WATCH = [
  CLI_DIST_PATH,
  CLI_SERVICE_PATH,
  SHARED_PATH,
  TYPES_PATH,
  VITE_PLUGIN_CONVENTIONAL_BASED_ROUTING_DIST_PATH,
  VITE_PLUGIN_DEV_SERVER_HTML_DIST_PATH,
  VITE_PLUGIN_PLASTICINE_ISLANDS_SITE_CONFIG_DIST_PATH,
  VITE_PLUGIN_MDX_DIST_PATH,
]
