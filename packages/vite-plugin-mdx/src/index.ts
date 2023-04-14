import rollupPluginMdx from '@mdx-js/rollup'
import rehypeAutolinkHeadings, { type Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { Plugin } from 'vite'

export default function vitePluginMdx(): Plugin {
  return rollupPluginMdx({
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
    ],
  })
}
