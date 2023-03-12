import { resolve } from 'path'
import { DIST_PATH } from './common'

export const CLIENT_ENTRY_PATH = resolve(DIST_PATH, 'bundless/runtime/client-entry.tsx')
export const SERVER_ENTRY_PATH = resolve(DIST_PATH, 'bundless/runtime/server-entry.tsx')
