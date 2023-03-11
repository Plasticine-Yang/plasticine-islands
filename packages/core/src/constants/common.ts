import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const PACKAGE_ROOT = resolve(__dirname, '../..')
export const PACKAGE_SRC_PATH = resolve(PACKAGE_ROOT, 'src')
