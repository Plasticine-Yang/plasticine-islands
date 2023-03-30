import { renderToString } from 'react-dom/server'

import App from './app'
import { RenderMetaContext } from './context'

export function render() {
  return renderToString(
    <RenderMetaContext.Provider value={{ mode: 'server' }}>
      <App />
    </RenderMetaContext.Provider>,
  )
}
