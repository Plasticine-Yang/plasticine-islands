import type { Plugin } from 'vite'
import assert from 'assert'

/** @description md or mdx regex */
const MD_REGEX = /.mdx?$/

/**
 * @description 用于支持 MDX 模块的 hmr
 *
 * Vite 底层处理 jsx/tsx 主要是通过 @vitejs/plugin-react 这个插件完成的，热更新则是依赖于 react-refresh
 * 在 jsx/tsx 的编译结果中插入 `import.meta.hot.accept` 的调用来识别热更新边界
 *
 * 然而 MDX 的编译结果中没有插入 `import.meta.hot.accept` 的调用，因此需要手动为 md, mdx 的编译结果加上热更新调用来告知 Vite 正确的
 * 热更新边界
 */
export default function vitePluginMdxHMR(): Plugin {
  let vitePluginReact: Plugin

  return {
    name: 'vite-plugin-mdx-hmr',
    apply: 'serve',
    configResolved(config) {
      vitePluginReact = config.plugins.find((plugin) => plugin.name === 'vite:react-babel') as Plugin
    },
    async transform(code, id, options) {
      // 为 md, mdx 的编译结果注入热更新相关代码，更新热更新边界
      if (MD_REGEX.test(id)) {
        const vitePluginReactTransform = vitePluginReact.transform
        assert(typeof vitePluginReactTransform === 'function', 'Vite 的 React Plugin 的 transform 方法不存在')

        const reactTransformResult = await vitePluginReactTransform.call(this, code, id + '?.jsx', options)
        const selfAcceptCode = 'import.meta.hot.accept();'

        if (typeof reactTransformResult === 'object' && !reactTransformResult?.code?.includes(selfAcceptCode)) {
          reactTransformResult!.code += selfAcceptCode
        }

        return reactTransformResult
      }
    },
  }
}
