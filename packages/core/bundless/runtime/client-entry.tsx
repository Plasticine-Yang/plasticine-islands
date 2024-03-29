import { createRoot } from 'react-dom/client'

import App from './app'
import { RenderMetaContext } from './context'

function renderInBrowser() {
  const $root = document.querySelector<HTMLDivElement>('#root')

  if ($root === null) {
    throw new Error('容器节点 `#root` 不存在，客户端渲染无法进行')
  }

  createRoot($root).render(
    <RenderMetaContext.Provider value={{ mode: 'client' }}>
      <App />
    </RenderMetaContext.Provider>,
  )
}

renderInBrowser()
