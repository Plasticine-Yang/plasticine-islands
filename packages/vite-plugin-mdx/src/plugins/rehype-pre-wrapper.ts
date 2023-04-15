import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { isCodeElement, parseCodeElement } from './shared'

/**
 * 为 markdown 代码块转换成的 html 中的 pre 标签进行修改
 *
 * @example
 *
 * before:
 *
 * ```html
 * <pre>
 *   <code class="language-ts">console.log('hello world')</code>
 * </pre>
 * ```
 *
 * after:
 *
 * ```html
 * <div class="language-ts">
 *   <span class="lang">js</span>
 *   <pre>
 *     <code class="language-ts">console.log('hello world')</code>
 *   </pre>
 * </div>
 * ```
 */
export const rehypePreWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // 1. 找到 pre 元素节点
      if (isCodeElement(node) && !node.data?.visited) {
        // 2. 解析出代码块的语言类型
        const codeElement = node.children.at(0) as Element
        const { codeElementClassName, codeLanguageType } = parseCodeElement(codeElement)

        // 3. 修改 pre 元素节点的结构 - 先拷贝一个 node 出来，再对 node 进行修改
        const clonedNode: Element = {
          type: 'element',
          tagName: 'pre',
          children: node.children,
          data: {
            // 避免重复遍历相同的 pre 元素节点导致递归无法终止
            visited: true,
          },
        }

        node.tagName = 'div'
        node.properties = node.properties || {}
        codeElementClassName && (node.properties.className = codeElementClassName)
        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang',
            },
            children: codeLanguageType
              ? [
                  {
                    type: 'text',
                    value: codeLanguageType,
                  },
                ]
              : [],
          },
          clonedNode,
        ]
      }
    })
  }
}
