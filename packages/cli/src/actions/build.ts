import { resolve } from 'path'

import { build } from '@plasticine-islands/core'
import type { ActionBuildFunc } from '@plasticine-islands/types'

import { loadConfig } from '../config-resolver'

export const actionBuild: ActionBuildFunc = async (root) => {
  /** @description 需要将相对路径 root 解析成绝对路径，默认使用命令执行时的路径作为 root */
  const parsedRoot = root !== undefined ? resolve(root) : process.cwd()

  const loadConfigResult = await loadConfig(parsedRoot)

  build(parsedRoot, loadConfigResult)
}
