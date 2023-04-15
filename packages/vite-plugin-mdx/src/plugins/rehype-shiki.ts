import type { Element, Root } from 'hast'
import type { Highlighter } from 'shiki'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { fromHtml } from 'hast-util-from-html'

import { isCodeElement, parseCodeElement } from './shared'

export interface RehypeShikiOptions {
  shikiHighlighter: Highlighter
}

export const rehypeShiki: Plugin<[RehypeShikiOptions], Root> = (options) => {
  const { shikiHighlighter } = options

  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (index !== null && isCodeElement(node)) {
        const codeElement = node.children.at(0) as Element
        const { codeContent, codeLanguageType } = parseCodeElement(codeElement)

        if (codeLanguageType) {
          const highlightedCode = shikiHighlighter.codeToHtml(codeContent, { lang: codeLanguageType })
          // 将 shiki 生成的 html 转成 hast 替换当前 node
          const fragmentHast = fromHtml(highlightedCode, { fragment: true })
          parent?.children.splice(index, 1, ...fragmentHast.children)
        }
      }
    })
  }
}
