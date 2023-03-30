import { useRouterProvider } from '../../runtime/hooks'

const Layout: React.FC = () => {
  const { renderRouterProvider } = useRouterProvider()

  return (
    <div>
      <p>Layout</p>

      {renderRouterProvider()}
    </div>
  )
}

export default Layout
