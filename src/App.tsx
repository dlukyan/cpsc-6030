import React from 'react'
import { ThemeProvider } from 'react-jss'

import AppRouter from './AppRouter'
import { theme, useGlobalStyles } from './theme'
import { SelectedStateProvider } from './context/selected-state-context'

const App: React.FC = () => {
  useGlobalStyles()
  return (
    <ThemeProvider theme={theme}>
      <SelectedStateProvider>
        <AppRouter />
      </SelectedStateProvider>
    </ThemeProvider>
  )
}

export default App
