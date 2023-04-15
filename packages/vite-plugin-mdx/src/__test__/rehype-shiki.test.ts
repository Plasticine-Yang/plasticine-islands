import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import shiki from 'shiki'
import { unified } from 'unified'

import { rehypeShiki } from '../plugins'

describe('rehypeShiki', () => {
  test('shiki demo', async () => {
    const highlighter = await shiki.getHighlighter({
      theme: 'nord',
    })

    const html = highlighter.codeToHtml("console.log('hello world')", { lang: 'js' })

    expect(html).toMatchInlineSnapshot(
      '"<pre class=\\"shiki nord\\" style=\\"background-color: #2e3440ff\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #D8DEE9\\">console</span><span style=\\"color: #ECEFF4\\">.</span><span style=\\"color: #88C0D0\\">log</span><span style=\\"color: #D8DEE9FF\\">(</span><span style=\\"color: #ECEFF4\\">&#39;</span><span style=\\"color: #A3BE8C\\">hello world</span><span style=\\"color: #ECEFF4\\">&#39;</span><span style=\\"color: #D8DEE9FF\\">)</span></span></code></pre>"',
    )
  })

  test('should highlight the code', async () => {
    const shikiHighlighter = await shiki.getHighlighter({
      theme: 'nord',
    })
    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeShiki, { shikiHighlighter })
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
      <pre class=\\"shiki nord\\" style=\\"background-color: #2e3440ff\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #D8DEE9\\">console</span><span style=\\"color: #ECEFF4\\">.</span><span style=\\"color: #88C0D0\\">log</span><span style=\\"color: #D8DEE9FF\\">(</span><span style=\\"color: #ECEFF4\\">'</span><span style=\\"color: #A3BE8C\\">hello world</span><span style=\\"color: #ECEFF4\\">'</span><span style=\\"color: #D8DEE9FF\\">)</span></span>
      <span class=\\"line\\"></span></code></pre>
      "
    `)
  })
})
