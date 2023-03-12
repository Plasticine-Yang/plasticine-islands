import { resolve } from 'path'

import { build } from '@plasticine-islands/core'
import type { ActionBuildFunc } from '@plasticine-islands/types'

export const actionBuild: ActionBuildFunc = (root, options = {}) => {
  /** @description 需要将相对路径 root 解析成绝对路径，默认使用命令执行时的路径作为 root */
  const parsedRoot = root !== undefined ? resolve(root) : process.cwd()

  build(parsedRoot, options)
}
