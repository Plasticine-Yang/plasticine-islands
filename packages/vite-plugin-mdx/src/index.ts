import rollupPluginMdx from '@mdx-js/rollup'
import rehypeAutolinkHeadings, { type Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { Plugin } from 'vite'

import { getShikiHighlighter } from './get-shiki-highlighter'
import { rehypePreWrapper, rehypeShiki, type RehypeShikiOptions } from './plugins'
import vitePluginMdxHMR from './plugins/vite-plugin-mdx-hmr'

export default async function vitePluginMdx(): Promise<Plugin[]> {
  return [
    // mdx
    rollupPluginMdx({
      remarkPlugins: [
        // Github Flavored Markdown Spec: https://github.github.com/gfm/
        remarkGfm,
      ],
      rehypePlugins: [
        // 自动为 h1, h2 等 headings 标签生成 id，id 的值会根据标签的内容决定
        rehypeSlug,

        // 自动为带有 id 属性的 headings 标签添加锚点链接
        [
          rehypeAutolinkHeadings,
          {
            // 为 headings 标签注入额外的 class - 用于定制样式
            properties: {
              class: 'header-anchor',
            },
            content: {
              type: 'text',
              value: '#',
            },
          } as RehypeAutolinkHeadingsOptions,
        ],

        // 将 markdown 代码块转换成的 html pre 元素节点 wrap 到 div 里，并带上代码块对应的语言
        rehypePreWrapper,

        // 代码块语法高亮
        [
          rehypeShiki,
          {
            shikiHighlighter: await getShikiHighlighter(),
          } as RehypeShikiOptions,
        ],
      ],
    }),

    // mdx hmr
    vitePluginMdxHMR(),
  ]
}
