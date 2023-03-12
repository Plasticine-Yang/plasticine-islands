import { resolve } from 'path'

import { DIST_PATH } from './common'

/** @description 开发环境服务器的 html 入口路径 */
export const DEV_SERVER_HTML_PATH = resolve(DIST_PATH, 'bundless/template/index.html')

export const CLIENT_ENTRY_PATH = resolve(DIST_PATH, 'bundless/runtime/client-entry.tsx')
