import { resolve } from 'path'

import { PACKAGE_SRC_PATH } from './common'

/** @description 开发环境服务器的 html 入口路径 */
export const DEV_SERVER_HTML_PATH = resolve(PACKAGE_SRC_PATH, 'template/index.html')
