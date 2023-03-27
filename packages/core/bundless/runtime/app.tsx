import siteConfig from 'virtual:plasticine-islands-site-config'

import Layout from '../theme-default'

const App: React.FC = () => {
  console.log(siteConfig)
  return <Layout />
}

export default App
