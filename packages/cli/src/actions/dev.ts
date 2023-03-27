import { resolve } from 'path'

import { createDevServer } from '@plasticine-islands/core'
import type { ActionDevFunc } from '@plasticine-islands/types'
import { resolveConfig } from '@plasticine-islands/cli-service'

/** @inheritdoc */
export const actionDev: ActionDevFunc = async (root) => {
  /** @description 需要将相对路径 root 解析成绝对路径，默认使用命令执行时的路径作为 root */
  const parsedRoot = root !== undefined ? resolve(root) : process.cwd()

  const resolvedConfig = await resolveConfig(parsedRoot)

  const server = await createDevServer(resolvedConfig)
  await server.listen()

  server.printUrls()
}
