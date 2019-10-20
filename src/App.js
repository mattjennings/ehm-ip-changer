import React from 'react'
import Leagues from './components/Leagues'
import { ThemeProvider } from '@material-ui/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import theme from './theme'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme} p>
        <SnackbarProvider preventDuplicate maxSnack={3}>
          <main>
            <Leagues />
          </main>
        </SnackbarProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  )
}

export default App
