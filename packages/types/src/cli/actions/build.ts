import type { BuildConfig } from '../../config'

export type BuildCommandOptions = BuildConfig

/** @description build 命令的 action */
export type ActionBuildFunc = (root?: string) => Promise<void>
