import { resolve } from 'path'
import { TEMPLATES_PATH } from './common'

export const SERVER_BUNDLE_DIRECTORY_NAME = '.temp'
export const SERVER_BUNDLE_NAME = 'server-entry.js'
export const BUILD_HTML_PATH = resolve(TEMPLATES_PATH, 'build.html')

/** @description 构建产物的 html 的默认 title */
export const DEFAULT_BUILD_HTML_TITLE = 'plasticine-islands'
