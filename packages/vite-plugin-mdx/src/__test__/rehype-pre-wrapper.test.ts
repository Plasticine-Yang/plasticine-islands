import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'

import { rehypePreWrapper } from '../plugins'

describe('rehypePreWrapper', () => {
  test('should wrap the `pre` element', () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePreWrapper)
      .use(rehypeFormat)
      .use(rehypeStringify)
    const markdown = `
\`\`\`ts
console.log('hello world')
\`\`\`
    `
    const res = processor.processSync(markdown)
    expect(res.value).toMatchInlineSnapshot(`
      "
      <div class=\\"language-ts\\"><span class=\\"lang\\">ts</span>
        <pre><code class=\\"language-ts\\">console.log('hello world')</code></pre>
      </div>
      "
    `)
  })
})
