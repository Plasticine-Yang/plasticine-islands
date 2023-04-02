declare module 'virtual:plasticine-islands-site-config' {
  import { SiteConfig } from '@plasticine-islands/types'

  const siteConfig: SiteConfig

  export default siteConfig
}

declare module 'virtual:conventional-based-routing' {
  import type { RouteObject } from 'react-router-dom'

  const routes: RouteObject[]

  export { routes }
}
