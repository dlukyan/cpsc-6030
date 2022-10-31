import React from 'react'
import { ThemeProvider } from 'react-jss'

import AppRouter from './AppRouter'
import { theme, useGlobalStyles } from './theme'

const App: React.FC = () => {
  useGlobalStyles()
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
