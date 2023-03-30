import { StrictMode } from 'react'
import siteConfig from 'virtual:plasticine-islands-site-config'

import Layout from '../theme-default'

const App: React.FC = () => {
  console.log(siteConfig)

  return (
    <StrictMode>
      <Layout />
    </StrictMode>
  )
}

export default App
