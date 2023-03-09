import type { ActionBuildFunc } from '@plasticine-islands/types'

export const actionBuild: ActionBuildFunc = (root) => {
  console.log(`build ${root}`)
}
