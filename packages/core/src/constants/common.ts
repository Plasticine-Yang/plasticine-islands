import { resolve } from 'path'

export const PACKAGE_ROOT = resolve(__dirname, '../..')
export const DIST_PATH = resolve(PACKAGE_ROOT, 'dist')
console.log(__dirname)
