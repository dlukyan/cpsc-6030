import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/home'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
