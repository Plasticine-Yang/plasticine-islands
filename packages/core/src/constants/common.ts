import { resolve } from 'path'

export const PACKAGE_ROOT = resolve(__dirname, '../..')
export const DIST_PATH = resolve(PACKAGE_ROOT, 'dist')
export const BUNDLESS_PATH = resolve(DIST_PATH, 'bundless')
export const TEMPLATES_PATH = resolve(BUNDLESS_PATH, 'templates')
