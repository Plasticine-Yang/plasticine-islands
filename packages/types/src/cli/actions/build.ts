export interface BuildCommandOptions {
  /**
   * @description 产物保存的目录
   * @default dist
   */
  outdir?: string
}

/** @description build 命令的 action */
export type ActionBuildFunc = (root?: string, options?: BuildCommandOptions) => void
