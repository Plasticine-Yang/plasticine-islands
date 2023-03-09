/** @description dev 命令的 action */
export type ActionDevFunc = (root?: string) => Promise<void>

/** @description build 命令的 action */
export type ActionBuildFunc = (root?: string) => void
