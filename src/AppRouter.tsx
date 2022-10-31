import React from 'react'
import { HashRouter, Route, RouteProps, Switch } from 'react-router-dom'
import { HomePage } from './pages/home'
import { NotFoundPage } from './pages/not-found'

interface Routes {
  '/': Record<string, unknown>
}

type RoutePath = keyof Routes
type Params<TPath extends RoutePath> = TPath extends RoutePath ? Routes[TPath] : never

interface CustomRouteProps<TPath extends RoutePath> extends Omit<RouteProps, 'component' | 'path'> {
  component: React.ComponentType<Params<TPath>>
  path: TPath
}

function AppRoute<TPath extends RoutePath>({ component: Component, ...routeProps }: CustomRouteProps<TPath>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Route {...routeProps} render={({ match: { params } }) => <Component {...params} />} />
}

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <AppRoute exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </HashRouter>
  )
}

export default AppRouter
