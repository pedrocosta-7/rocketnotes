import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Details } from './pages/Details/Details.jsx'
import { ThemeProvider } from "styled-components"
import theme from './styles/theme.js'
import GlobalStyles from './styles/global.js'
import { Routes } from './routes'
import { AuthProvider} from './hooks/auth.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <AuthProvider>
    <Routes />
    </AuthProvider>
  </ThemeProvider>
  </StrictMode>,
)
