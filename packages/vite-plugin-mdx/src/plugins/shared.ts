import type { Element, Text } from 'hast'

/** @description 判断元素节点是否是 markdown 代码块转换而来的 html ast 节点 */
export function isCodeElement(element: Element) {
  const firstChild = element.children.at(0)
  return element.tagName === 'pre' && firstChild?.type === 'element' && firstChild.tagName === 'code'
}

/**
 * @description 解析出代码块 html 元素的 className、代码内容、代码语言类型
 *
 * @example
 *
 * ```html
 * <code class="language-ts">console.log('hello world')</code>
 * ```
 */
export function parseCodeElement(codeElement: Element) {
  const codeContent = (codeElement.children.at(0) as Text).value
  const codeElementClassName = codeElement.properties?.className?.toString()
  const codeLanguageType = codeElementClassName?.split('-').at(1)

  return {
    codeElementClassName,
    codeContent,
    codeLanguageType,
  }
}
